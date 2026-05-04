import { Client, isFullPage } from "@notionhq/client";
import type { PageObjectResponse, QueryDataSourceParameters } from "@notionhq/client";

/** Notion property bag (safe access) */
type NotionProps = PageObjectResponse["properties"];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Professor = {
  id: string;
  nameEn: string;
  nameKr: string;
  position: string;
  affiliation: string;
  about: string;
  email: string;
  googleScholarUrl: string;
  orcidUrl: string;
  photoUrl: string | null;
  education: Array<{ degree: string; school: string; year: string }>;
  experience: Array<{ position: string; institution: string; period: string }>;
};

export type Member = {
  id: string;
  nameEn: string;
  nameKr: string | null;
  position: string;
  positionCategory: string;
  email: string;
  keywords: string[];
  photoUrl: string | null;
  order: number;
  status: "Current" | "Alumni";
  joinYear: number | null;
  endYear: number | null;
  currentAffiliation: string | null;
};

export type ResearchTopic = {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  keywords: string[];
  imageUrl: string | null;
  featured: boolean;
  order: number;
};

export type NewsItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  imageUrl: string | null;
  link: string | null;
};

export type JournalArticle = {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume: string;
  doi: string | null;
  pdfUrl: string | null;
  type: "Journal" | "Conference";
  /** Notion Status / Publication Status select (or status) option name as stored in DB. */
  status: string;
  featured: boolean;
  order: number;
};

export type Patent = {
  id: string;
  number: string;
  country: "KR" | "US" | "PCT";
  title: string;
  inventors: string;
  applicationNumber: string;
  filedDate: string;
  registeredDate: string | null;
  status: "Filed" | "Registered";
  order: number;
};

export type Logo = {
  id: string;
  name: string;
  imageUrl: string | null;
  description: string;
  active: boolean;
};

// ---------------------------------------------------------------------------
// Client + DB IDs
// ---------------------------------------------------------------------------

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DB = {
  professor: process.env.NOTION_PROFESSOR_DB_ID,
  members: process.env.NOTION_MEMBERS_DB_ID,
  news: process.env.NOTION_NEWS_DB_ID,
  articles: process.env.NOTION_ARTICLES_DB_ID,
  patents: process.env.NOTION_PATENTS_DB_ID,
  research: process.env.NOTION_RESEARCH_DB_ID,
  logos: process.env.NOTION_LOGOS_DB_ID,
} as const;

function firstProp(props: NotionProps, ...names: string[]) {
  for (const n of names) {
    const p = props[n];
    if (p) return p;
  }
  return undefined;
}

/** First property on the page whose Notion `type` matches (e.g. "title"). */
function firstPropertyByNotionType(
  props: NotionProps,
  notionType: string,
): unknown {
  for (const v of Object.values(props)) {
    if (!v || typeof v !== "object" || !("type" in v)) continue;
    if ((v as { type: string }).type === notionType) return v;
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Property extractors (Notion API shape)
// ---------------------------------------------------------------------------

export function extractTitle(property: unknown): string {
  const p = property as { title?: Array<{ plain_text: string }> } | undefined;
  if (!p?.title?.length) return "";
  return p.title.map((t) => t.plain_text).join("");
}

export function extractRichText(property: unknown): string {
  const p = property as { rich_text?: Array<{ plain_text: string }> } | undefined;
  if (!p?.rich_text?.length) return "";
  return p.rich_text.map((t) => t.plain_text).join("");
}

/** Alias / generic plain text from title or rich_text */
export function extractText(property: unknown): string {
  const t = extractTitle(property);
  if (t) return t;
  return extractRichText(property);
}

export function extractNumber(property: unknown): number {
  const p = property as { number?: number | null } | undefined;
  return p?.number ?? 0;
}

export function extractSelect(property: unknown): string {
  const p = property as { select?: { name: string } | null } | undefined;
  return p?.select?.name ?? "";
}

/**
 * Plain text from a Notion property regardless of common value shapes
 * (title, rich_text, select, status, multi-select first, url, email).
 */
export function extractAny(property: unknown): string {
  if (property == null) return "";
  if (typeof property === "string") return property;

  const p = property as Record<string, unknown>;

  if (Array.isArray(p.title)) {
    const t = extractTitle(property);
    if (t) return t;
  }
  if (Array.isArray(p.rich_text)) {
    const t = extractRichText(property);
    if (t) return t;
  }

  const sel = p.select as { name?: string } | null | undefined;
  if (sel && typeof sel === "object" && typeof sel.name === "string" && sel.name) {
    return sel.name;
  }

  const st = p.status as { name?: string } | null | undefined;
  if (st && typeof st === "object" && typeof st.name === "string" && st.name) {
    return st.name;
  }

  const ms = p.multi_select as Array<{ name?: string }> | undefined;
  if (Array.isArray(ms) && ms[0]?.name) return ms[0].name;

  const url = extractUrl(property);
  if (url) return url;

  const em = extractEmail(property);
  if (em) return em;

  return "";
}

export function extractMultiSelect(property: unknown): string[] {
  const p = property as { multi_select?: Array<{ name: string }> } | undefined;
  if (!p?.multi_select) return [];
  return p.multi_select.map((opt) => opt.name);
}

export function extractCheckbox(property: unknown): boolean {
  const p = property as { checkbox?: boolean } | undefined;
  return p?.checkbox ?? false;
}

export function extractUrl(property: unknown): string {
  const p = property as { url?: string | null } | undefined;
  return p?.url ?? "";
}

export function extractEmail(property: unknown): string {
  const p = property as { email?: string | null } | undefined;
  return p?.email ?? "";
}

export function extractDate(property: unknown): string {
  const p = property as { date?: { start?: string | null } | null } | undefined;
  if (!p?.date?.start) return "";
  const date = new Date(p.date.start);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function extractYearFromDate(property: unknown): number {
  const p = property as { date?: { start?: string | null } | null } | undefined;
  if (!p?.date?.start) return 0;
  const d = new Date(p.date.start);
  return Number.isNaN(d.getTime()) ? 0 : d.getFullYear();
}

export function extractFileUrl(property: unknown): string | null {
  const p = property as {
    files?: Array<{ file?: { url: string }; external?: { url: string } }>;
  } | undefined;
  const files = p?.files;
  if (!files || files.length === 0) return null;
  const first = files[0];
  return first.file?.url ?? first.external?.url ?? null;
}

/** Split "a | b | c" or "a - b - c" lines into tuples */
function parseTripleLines(
  text: string,
): Array<{ a: string; b: string; c: string }> {
  if (!text.trim()) return [];
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(/\s*[|\u2013\u2014-]\s*/).map((s) => s.trim());
      return {
        a: parts[0] ?? "",
        b: parts[1] ?? "",
        c: parts[2] ?? "",
      };
    });
}

function mapEducationFromProps(props: NotionProps): Professor["education"] {
  const eduProp = firstProp(
    props,
    "Education",
    "학력",
    "Education (List)",
    "학력 사항",
    "Academic Background",
  );
  const raw = extractAny(eduProp);
  const rows = parseTripleLines(raw);
  return rows.map((r) => ({
    degree: r.a,
    school: r.b,
    year: r.c,
  }));
}

function mapExperienceFromProps(props: NotionProps): Professor["experience"] {
  const expProp = firstProp(
    props,
    "Experience",
    "경력",
    "Experience (List)",
    "경력 사항",
    "Work Experience",
  );
  const raw = extractAny(expProp);
  const rows = parseTripleLines(raw);
  return rows.map((r) => ({
    position: r.a,
    institution: r.b,
    period: r.c,
  }));
}

function normalizeMemberStatus(s: string): "Current" | "Alumni" {
  const u = s.toLowerCase();
  if (u.includes("alumni")) return "Alumni";
  return "Current";
}

function normalizeArticleType(s: string): "Journal" | "Conference" {
  const u = s.toLowerCase();
  if (u.includes("conference")) return "Conference";
  return "Journal";
}

function normalizePatentCountry(s: string): Patent["country"] {
  const u = s.toUpperCase();
  if (u === "US" || u.includes("UNITED")) return "US";
  if (u === "PCT" || u.includes("PCT")) return "PCT";
  return "KR";
}

function normalizePatentStatus(s: string): Patent["status"] {
  const u = s.toUpperCase();
  if (u.includes("REGISTER")) return "Registered";
  return "Filed";
}

/**
 * With Notion-Version 2025-09-03 (SDK v5 default), POST /v1/databases/:id/query
 * is no longer valid and returns invalid_request_url. Query the database's
 * data source via dataSources.query, or fall back to legacy database query.
 */
type DatabaseQueryBody = {
  filter?: Record<string, unknown>;
  sorts?: Array<{ property: string; direction: "ascending" | "descending" }>;
  page_size?: number;
  start_cursor?: string;
};

type DatabaseQueryResponse = {
  results: unknown[];
  next_cursor?: string | null;
  has_more?: boolean;
};

/** Notion-Version that still supports POST /v1/databases/:id/query */
const NOTION_LEGACY_DATABASE_QUERY_VERSION = "2022-06-28";

/** Env database_id (or data_source_id) -> data_source_id used for query */
const dataSourceIdCache = new Map<string, string>();

function buildDatabaseQueryPayload(body: DatabaseQueryBody): Record<string, unknown> {
  const cleaned: Record<string, unknown> = {};
  if (body.sorts?.length) cleaned.sorts = body.sorts;
  if (body.filter) cleaned.filter = body.filter;
  if (body.page_size != null && body.page_size > 0) {
    cleaned.page_size = body.page_size;
  }
  if (body.start_cursor) cleaned.start_cursor = body.start_cursor;
  return cleaned;
}

/**
 * Resolve an ID from .env to a data_source_id for notion.dataSources.query().
 * - If it is a database ID: GET database -> data_sources[0].id
 * - If it is already a data source ID: retrieve succeeds, return same id
 */
async function resolveQueryDataSourceId(containerId: string): Promise<string | null> {
  const cached = dataSourceIdCache.get(containerId);
  if (cached) return cached;

  try {
    const db = await notion.databases.retrieve({ database_id: containerId });
    if (db.object === "database" && "data_sources" in db && db.data_sources?.length) {
      const dsId = db.data_sources[0].id;
      dataSourceIdCache.set(containerId, dsId);
      return dsId;
    }
  } catch {
    // not a database id or no access
  }

  try {
    await notion.dataSources.retrieve({ data_source_id: containerId });
    dataSourceIdCache.set(containerId, containerId);
    return containerId;
  } catch {
    return null;
  }
}

async function queryDatabaseViaLegacyRest(
  databaseId: string,
  payload: Record<string, unknown>,
): Promise<DatabaseQueryResponse> {
  const token = process.env.NOTION_API_KEY;
  if (!token) {
    throw new Error("Missing NOTION_API_KEY");
  }

  const res = await fetch(
    `https://api.notion.com/v1/databases/${encodeURIComponent(databaseId)}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": NOTION_LEGACY_DATABASE_QUERY_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Notion database query failed: ${res.status} ${text}`);
  }
  const data = JSON.parse(text) as DatabaseQueryResponse;
  if (!Array.isArray(data.results)) {
    return { results: [], next_cursor: null, has_more: false };
  }
  return data;
}

/** Narrow unknown API rows to full pages (satisfies `isFullPage` typing). */
function toFullPage(row: unknown): PageObjectResponse | null {
  if (row === null || typeof row !== "object") return null;
  if (!("properties" in row)) return null;
  if (!isFullPage(row as never)) return null;
  return row as PageObjectResponse;
}

function fullPageResults(results: unknown[]): PageObjectResponse[] {
  const out: PageObjectResponse[] = [];
  for (const r of results) {
    const p = toFullPage(r);
    if (p) out.push(p);
  }
  return out;
}

async function queryDatabase(
  databaseId: string | undefined,
  body: DatabaseQueryBody = {},
): Promise<DatabaseQueryResponse> {
  if (!databaseId) {
    throw new Error("Missing Notion database_id env");
  }
  const payload = buildDatabaseQueryPayload(body);

  const dataSourceId = await resolveQueryDataSourceId(databaseId);
  if (dataSourceId) {
    const params = {
      data_source_id: dataSourceId,
      ...payload,
    } as QueryDataSourceParameters;
    const res = await notion.dataSources.query(params);
    return {
      results: res.results as unknown[],
      next_cursor: res.next_cursor,
      has_more: res.has_more,
    };
  }

  return queryDatabaseViaLegacyRest(databaseId, payload);
}

// ---------------------------------------------------------------------------
// Public fetchers
// ---------------------------------------------------------------------------

export async function getProfessor(): Promise<Professor | null> {
  try {
    const id = DB.professor;
    if (!id) return null;
    const response = await queryDatabase(id, { page_size: 1 });
    const page = toFullPage(response.results[0]);
    if (!page) return null;
    const props = page.properties as NotionProps;

    const nameEnProp = firstProp(
      props,
      "Name (EN)",
      "Name (English)",
      "Name",
      "Title",
      "이름",
      "Name EN",
      "English Name",
    );
    const nameKrProp = firstProp(
      props,
      "Name (KR)",
      "Name (Korean)",
      "한글이름",
      "이름 (한글)",
      "Korean Name",
      "Name KR",
    );
    const positionProp = firstProp(
      props,
      "Position",
      "Role",
      "직위",
      "Job Title",
      "Title",
    );
    const affiliationProp = firstProp(
      props,
      "Affiliation",
      "Department",
      "소속",
      "Institution",
      "Organization",
    );
    const aboutProp = firstProp(
      props,
      "About",
      "Bio",
      "Description",
      "소개",
      "Introduction",
    );
    const emailProp = firstProp(props, "Email", "이메일", "E-mail");
    const scholarProp = firstProp(
      props,
      "Google Scholar",
      "Google Scholar URL",
      "Scholar",
      "Scholar URL",
    );
    const orcidProp = firstProp(props, "ORCID", "ORCID URL", "Orcid");
    const photoProp =
      firstProp(
        props,
        "Photo",
        "Image",
        "사진",
        "Picture",
        "Headshot",
        "Profile Photo",
        "Photo URL",
      ) ?? firstProp(props, "Profile");

    const nameEn =
      extractAny(nameEnProp) ||
      extractAny(firstPropertyByNotionType(props, "title"));
    const nameKrRaw = extractAny(nameKrProp);
    const position = extractAny(positionProp);
    const affiliation = extractAny(affiliationProp);
    const about = extractAny(aboutProp);
    const email = extractEmail(emailProp) || extractAny(emailProp);
    const googleScholarUrl =
      extractUrl(scholarProp) || extractAny(scholarProp).trim();
    const orcidUrl = extractUrl(orcidProp) || extractAny(orcidProp).trim();

    return {
      id: page.id,
      nameEn,
      nameKr: nameKrRaw,
      position,
      affiliation,
      about,
      email,
      googleScholarUrl,
      orcidUrl,
      photoUrl:
        extractFileUrl(photoProp) ||
        extractFileUrl(firstProp(props, "Image", "사진")),
      education: mapEducationFromProps(props),
      experience: mapExperienceFromProps(props),
    };
  } catch (error) {
    console.error("Failed to fetch professor:", error);
    return null;
  }
}

export async function getMembers(): Promise<Member[]> {
  try {
    const id = DB.members;
    if (!id) return [];
    const response = await queryDatabase(id, {
      sorts: [{ property: "Order", direction: "ascending" }],
    });
    const members = fullPageResults(response.results).map((page) => {
      const props = page.properties as NotionProps;
      const nameKrText = extractRichText(
        firstProp(
          props,
          "Name(KR)",
          "Name (KR)",
          "Name (Korean)",
          "한글이름",
          "Korean Name",
          "Name KR",
        ),
      );
      const position = extractSelect(firstProp(props, "Position", "Title", "Role", "직위"));
      const category =
        extractSelect(
          firstProp(props, "Position Category", "Category", "Group", "그룹"),
        ) || position;

      const joinYearRaw =
        extractNumber(firstProp(props, "Join year", "JoinYear", "Join Year")) ||
        extractNumber(props["Join year" as keyof NotionProps]) ||
        extractNumber(props["JoinYear" as keyof NotionProps]);

      const endYearRaw =
        extractNumber(
          firstProp(
            props,
            "End Year",
            "End year",
            "EndYear",
            "Graduation year",
            "Graduation Year",
          ),
        ) ||
        extractNumber(props["End Year" as keyof NotionProps]) ||
        extractNumber(props["End year" as keyof NotionProps]) ||
        extractNumber(props["EndYear" as keyof NotionProps]) ||
        extractNumber(props["Graduation year" as keyof NotionProps]);

      const currentAffiliationRaw = extractRichText(
        firstProp(
          props,
          "Current Affiliation",
          "CurrentAffiliation",
          "현재 소속",
          "Current",
        ),
      ).trim();

      return {
        id: page.id,
        nameEn:
          extractTitle(
            firstProp(
              props,
              "Name(EN)",
              "Name (EN)",
              "Name (English)",
              "Name",
              "Title",
              "이름",
            ),
          ) || extractTitle(props["title" as keyof NotionProps]),
        nameKr: nameKrText.trim() ? nameKrText : null,
        position,
        positionCategory: category,
        email: extractEmail(firstProp(props, "Email", "이메일")),
        keywords:
          extractMultiSelect(
            firstProp(props, "Research Keywords", "Keywords", "키워드"),
          ) || [],
        photoUrl:
          extractFileUrl(firstProp(props, "Photo", "Image", "사진")) ||
          extractFileUrl(firstProp(props, "Picture")),
        order: extractNumber(firstProp(props, "Order", "Sort")),
        status: normalizeMemberStatus(
          extractSelect(firstProp(props, "Status", "상태")) || "Current",
        ),
        joinYear: joinYearRaw > 0 ? joinYearRaw : null,
        endYear: endYearRaw > 0 ? endYearRaw : null,
        currentAffiliation: currentAffiliationRaw ? currentAffiliationRaw : null,
      };
    });

    return members;
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return [];
  }
}

export async function getResearchTopics(featuredOnly?: boolean): Promise<ResearchTopic[]> {
  try {
    const id = DB.research;
    if (!id) return [];
    const sorts = [{ property: "Order", direction: "ascending" as const }];
    let response: DatabaseQueryResponse;
    if (featuredOnly) {
      try {
        response = await queryDatabase(id, {
          sorts,
          filter: { property: "Featured", checkbox: { equals: true } },
        });
      } catch {
        response = await queryDatabase(id, { sorts });
      }
    } else {
      response = await queryDatabase(id, { sorts });
    }

    let topics = fullPageResults(response.results).map((page) => {
        const props = page.properties as NotionProps;
        const num = String(
          extractNumber(firstProp(props, "Number", "No.", "#", "Index")) ||
            extractRichText(firstProp(props, "Number", "Topic Number")),
        ).padStart(2, "0");

        return {
          id: page.id,
          number: num || "01",
          title:
            extractTitle(firstProp(props, "Title", "Topic", "Name", "제목")) ||
            extractTitle(props["title" as keyof NotionProps]),
          shortDescription:
            extractRichText(
              firstProp(props, "Short Description", "Summary", "요약"),
            ) || "",
          longDescription:
            extractRichText(
              firstProp(props, "Long Description", "Description", "본문"),
            ) || "",
          keywords:
            extractMultiSelect(firstProp(props, "Keywords", "Research Keywords")) || [],
          imageUrl:
            extractFileUrl(firstProp(props, "Image", "Photo", "Cover", "이미지")) ||
            null,
          featured: extractCheckbox(firstProp(props, "Featured", "Featured?", "Pick")),
          order: extractNumber(firstProp(props, "Order", "Sort")),
        };
      });
    if (featuredOnly) {
      topics = topics.filter((t) => t.featured);
    }
    return topics;
  } catch (error) {
    console.error("Failed to fetch research topics:", error);
    return [];
  }
}

/** First non-empty Files & Media URL among common Notion column names. */
function firstNewsImageUrl(props: NotionProps): string | null {
  const names = [
    "Image",
    "Photo",
    "Thumbnail",
    "Cover",
    "Hero",
    "썸네일",
    "이미지",
    "사진",
  ];
  for (const name of names) {
    const cell = props[name];
    if (!cell) continue;
    const url = extractFileUrl(cell);
    if (url) return url;
  }
  return null;
}

export async function getNews(limit?: number): Promise<NewsItem[]> {
  try {
    const id = DB.news;
    if (!id) return [];
    const response = await queryDatabase(id, {
      sorts: [{ property: "Date", direction: "descending" }],
      ...(limit && limit > 0 ? { page_size: Math.min(limit, 100) } : {}),
    });

    const pages = fullPageResults(response.results);

    return pages.map((page) => {
      const props = page.properties as NotionProps;
      return {
        id: page.id,
        title:
          extractTitle(firstProp(props, "Title", "Name", "제목")) ||
          extractTitle(props["title" as keyof NotionProps]),
        description:
          extractRichText(
            firstProp(props, "Description", "Summary", "Excerpt", "내용"),
          ) || "",
        category:
          extractSelect(firstProp(props, "Category", "Type", "Tag", "분류")) || "News",
        date:
          extractDate(firstProp(props, "Date", "Published", "게시일")) ||
          extractDate(firstProp(props, "Publish Date")),
        imageUrl: firstNewsImageUrl(props),
        link: extractUrl(firstProp(props, "Link", "URL", "External Link")) || null,
      };
    });
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return [];
  }
}

/** Notion Select or Status property: read display name from either shape. */
function extractSelectOrStatusName(property: unknown): string {
  if (property == null) return "";
  const p = property as {
    select?: { name?: string | null } | null;
    status?: { name?: string | null } | null;
  };
  const fromSelect = (p.select?.name ?? "").trim();
  if (fromSelect) return fromSelect;
  return (p.status?.name ?? "").trim();
}

function extractJournalArticleStatus(props: NotionProps): string {
  const cells: unknown[] = [
    firstProp(props, "Status", "Publication Status", "Paper Status", "상태"),
    props["Status" as keyof NotionProps],
    props["status" as keyof NotionProps],
    props["STATUS" as keyof NotionProps],
    props["Publication Status" as keyof NotionProps],
  ];

  for (const cell of cells) {
    if (cell == null) continue;
    let t = extractSelectOrStatusName(cell);
    if (t) return t;
    t = extractSelect(cell).trim();
    if (t) return t;
    t = extractRichText(cell).trim();
    if (t) return t;
    t = extractAny(cell).trim();
    if (t) return t;
  }
  return "";
}

export async function getJournalArticles(): Promise<JournalArticle[]> {
  try {
    const id = DB.articles;
    if (!id) return [];

    const mapArticle = (page: PageObjectResponse): JournalArticle => {
      const props = page.properties as NotionProps;
      const authorsRaw =
        extractRichText(firstProp(props, "Authors", "Author", "저자")) ||
        extractTitle(firstProp(props, "Authors", "Author"));
      const authors = authorsRaw
        .split(/[,;]\s*/)
        .map((a) => a.trim())
        .filter(Boolean);

      const yearProp = firstProp(props, "Year", "Publication Year", "연도");
      const yearNum = extractNumber(yearProp) || extractYearFromDate(yearProp);

      const statusRaw = extractJournalArticleStatus(props);
      const statusFinal = statusRaw.trim() || "Published";

      return {
        id: page.id,
        title:
          extractTitle(firstProp(props, "Title", "Paper Title", "제목")) ||
          extractTitle(props["title" as keyof NotionProps]),
        authors: authors.length ? authors : [],
        journal:
          extractRichText(firstProp(props, "Journal", "Venue", "저널")) ||
          extractSelect(firstProp(props, "Journal", "Venue")) ||
          "",
        year: yearNum,
        volume:
          extractRichText(firstProp(props, "Volume", "Vol.", "권호")) ||
          extractTitle(firstProp(props, "Volume", "Issue")) ||
          "",
        doi: (() => {
          const u = extractUrl(firstProp(props, "DOI", "Doi"));
          return u || null;
        })(),
        pdfUrl: (() => {
          const u = extractUrl(firstProp(props, "PDF", "Pdf", "PDF URL"));
          return u || null;
        })(),
        type: normalizeArticleType(
          extractSelect(firstProp(props, "Type", "Kind", "유형")) || "Journal",
        ),
        status: statusFinal,
        featured: extractCheckbox(firstProp(props, "Featured", "Featured?", "Pick")),
        order: extractNumber(firstProp(props, "Order", "Sort")),
      };
    };

    let articles: JournalArticle[];

    try {
      const response = await queryDatabase(id, {
        sorts: [
          { property: "Year", direction: "descending" },
          { property: "Order", direction: "descending" },
        ],
      });
      articles = fullPageResults(response.results).map(mapArticle);
    } catch (sortError) {
      console.warn("Sort failed, fetching without sort:", sortError);
      const response = await queryDatabase(id, {});
      articles = fullPageResults(response.results).map(mapArticle);
      articles.sort((a, b) => {
        if ((b.year || 0) !== (a.year || 0)) return (b.year || 0) - (a.year || 0);
        return (b.order || 0) - (a.order || 0);
      });
    }

    return articles;
  } catch (error) {
    console.error("Failed to fetch journal articles:", error);
    return [];
  }
}

export async function getPatents(): Promise<Patent[]> {
  try {
    const id = DB.patents;
    if (!id) return [];
    let response: DatabaseQueryResponse;
    try {
      response = await queryDatabase(id, {
        sorts: [{ property: "Number", direction: "descending" }],
      });
    } catch {
      response = await queryDatabase(id, {
        sorts: [{ property: "Order", direction: "descending" }],
      });
    }

    return fullPageResults(response.results).map((page) => {
        const props = page.properties as NotionProps;
        const numStr = String(
          extractNumber(firstProp(props, "Number", "No.", "#", "Patent Number")) ||
            extractTitle(firstProp(props, "Number", "Patent No")),
        ).padStart(2, "0");

        return {
          id: page.id,
          number: numStr || "00",
          country: normalizePatentCountry(
            extractSelect(firstProp(props, "Country", "Region", "국가")) || "KR",
          ),
          title:
            extractTitle(firstProp(props, "Title", "Name", "제목")) ||
            extractTitle(props["title" as keyof NotionProps]),
          inventors:
            extractRichText(firstProp(props, "Inventors", "Inventor", "발명자")) ||
            extractTitle(firstProp(props, "Inventors")) ||
            "",
          applicationNumber:
            extractRichText(
              firstProp(props, "Application Number", "App No", "출원번호"),
            ) ||
            extractTitle(firstProp(props, "Application Number", "Patent No")) ||
            "",
          filedDate:
            extractDate(firstProp(props, "Filed Date", "Filed", "출원일")) || "",
          registeredDate: (() => {
            const d = extractDate(
              firstProp(props, "Registered Date", "Registration Date", "등록일"),
            );
            return d || null;
          })(),
          status: normalizePatentStatus(
            extractSelect(firstProp(props, "Status", "Patent Status", "상태")) ||
              "Filed",
          ),
          order: extractNumber(firstProp(props, "Order", "Sort")),
        };
      });
  } catch (error) {
    console.error("Failed to fetch patents:", error);
    return [];
  }
}

export async function getLogos(): Promise<Logo[]> {
  try {
    const id = DB.logos;
    if (!id) return [];
    let response: DatabaseQueryResponse;
    try {
      response = await queryDatabase(id, {
        filter: {
          property: "Active",
          checkbox: { equals: true },
        },
        sorts: [{ property: "Name", direction: "ascending" }],
      });
    } catch {
      response = await queryDatabase(id, {
        sorts: [{ property: "Name", direction: "ascending" }],
      });
    }

    return fullPageResults(response.results).map((page) => {
        const props = page.properties as NotionProps;
        return {
          id: page.id,
          name:
            extractTitle(firstProp(props, "Name", "Title", "이름")) ||
            extractTitle(props["title" as keyof NotionProps]),
          imageUrl:
            extractFileUrl(firstProp(props, "Image", "File", "Logo", "이미지")) || null,
          description:
            extractRichText(firstProp(props, "Description", "Notes", "설명")) || "",
          active: extractCheckbox(firstProp(props, "Active", "Enabled", "사용")),
        };
      })
      .filter((logo) => logo.active);
  } catch (error) {
    console.error("Failed to fetch logos:", error);
    return [];
  }
}

export async function getLogoByName(name: string): Promise<Logo | null> {
  try {
    const trimmed = name.trim();
    if (!trimmed) return null;
    const logos = await getLogos();
    return (
      logos.find((logo) => logo.name.trim() === trimmed && logo.active) || null
    );
  } catch (error) {
    console.error("Failed to fetch logo:", error);
    return null;
  }
}
