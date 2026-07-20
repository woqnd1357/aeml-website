export default function ContactPage() {
  return (
    <div className="relative min-h-full overflow-x-hidden bg-[#FAFAFA] text-[#1A1A1A]">
      {/* 배경 장식 */}
      <div className="pointer-events-none fixed right-0 top-0 z-0 h-[50vh] w-[50vw] translate-x-1/4 -translate-y-1/2 rounded-full bg-[#0047BB]/5 blur-[150px]" />

      <div className="relative z-10">
        {/* 페이지 헤더 */}
        <section className="mx-auto w-full max-w-[1440px] px-8 pb-8 pt-16 lg:px-16">
          <span className="mb-4 block text-sm text-[#666666]">Contact</span>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[#1A1A1A] md:text-5xl lg:text-6xl">
            Contact
          </h1>
          <p className="mb-12 max-w-2xl text-lg text-[#666666]">
            Get in touch with the Advanced Energy Materials Laboratory.
          </p>
          <div className="w-full border-b border-[#E5E5E5]" />
        </section>

        {/* 연락처 + 지도 */}
        <section className="mx-auto w-full max-w-[1440px] px-8 py-8 lg:px-16 lg:py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="flex flex-col gap-10 lg:col-span-2">
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#0047BB]">
                  VISIT US
                </h3>
                <div className="mb-4 h-0.5 w-10 bg-[#0047BB]" />
                <p className="text-base leading-relaxed text-[#1A1A1A] lg:text-lg">
                  Hongik University, Room K415
                  <br />
                  94 Wausan-ro, Mapo-gu
                  <br />
                  Seoul, 04066, Republic of Korea
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#0047BB]">
                  CALL US
                </h3>
                <div className="mb-4 h-0.5 w-10 bg-[#0047BB]" />
                <a
                  href="tel:+8223201623"
                  className="block text-base text-[#1A1A1A] transition-colors hover:text-[#0047BB] lg:text-lg"
                >
                  +82 2-320-1623
                </a>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#0047BB]">
                  EMAIL US
                </h3>
                <div className="mb-4 h-0.5 w-10 bg-[#0047BB]" />
                <a
                  href="mailto:dongwook@hongik.ac.kr"
                  className="block text-base text-[#1A1A1A] transition-colors hover:text-[#0047BB] lg:text-lg"
                >
                  dongwook@hongik.ac.kr
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="h-[360px] min-h-[360px] w-full border border-[#E5E5E5] bg-gray-100 lg:h-[480px] lg:min-h-[480px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.1200910820226!2d126.9234000758768!3d37.552234324948095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c98c4136a768d%3A0x519a0cd097a8c29e!2z7ZmN7J2164yA7ZWZ6rWQIOygnDHqs7XtlZnqtIA!5e0!3m2!1sko!2skr!4v1777077722420!5m2!1sko!2skr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                  title="Hongik University K Building Map"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 대학원생 모집 (JOIN US) — 배너/팝업이 이 위치(#join)로 이동 */}
        <section
          id="join"
          className="mx-auto w-full max-w-[1440px] scroll-mt-28 px-8 py-8 lg:px-16 lg:py-16"
        >
          <div className="mx-auto max-w-[1000px] border border-[#E5E5E5] bg-white p-10 lg:p-12">
            {/* 라벨 */}
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#0047BB]">
              JOIN US
            </h3>
            <div className="mb-6 h-0.5 w-10 bg-[#0047BB]" />

            {/* 제목 + 상시 모집 배지 */}
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A] lg:text-4xl">
                대학원생 모집
              </h2>
              <span className="inline-flex items-center rounded-full bg-[#FEF3C7] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#92400E]">
                상시 모집 · Always Open
              </span>
            </div>
            <p className="mb-10 text-lg text-[#666666]">
              We&apos;re Recruiting Graduate Students · 석사 · 박사 · 석·박사 통합과정
            </p>

            {/* 한국어 / English 2단 */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
              {/* 한국어 */}
              <div>
                <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#0047BB]">
                  한국어
                </span>
                <p className="mb-6 text-base leading-relaxed text-[#666666]">
                  홍익대학교 신소재공학과 첨단에너지소재연구실(AEML)에서 함께 연구할
                  대학원생을 모집합니다. 우리 연구실은 이동욱 교수님의 지도 아래, 지속가능한
                  에너지·환경 기술의 바탕이 되는 소재와 공정을 연구합니다.
                </p>

                <p className="mb-2 text-base font-bold text-[#1A1A1A]">모집 과정</p>
                <p className="mb-6 text-base leading-relaxed text-[#666666]">
                  석사과정 · 박사과정 · 석·박사 통합과정
                </p>

                <p className="mb-2 text-base font-bold text-[#1A1A1A]">주요 연구 분야</p>
                <ul className="mb-6 space-y-2 text-base leading-relaxed text-[#666666]">
                  <li className="flex gap-2">
                    <span className="text-[#0047BB]">•</span>
                    <span>
                      <strong className="font-semibold text-[#1A1A1A]">차세대 리튬전지 소재</strong>
                      {" "}— 리튬 금속 전지, 고체·복합 전해질, 고니켈 양극
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#0047BB]">•</span>
                    <span>
                      <strong className="font-semibold text-[#1A1A1A]">2차원(2D) 소재의 용액 공정·박막 코팅</strong>
                      {" "}— 균일 습식 증착·건조 공정
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#0047BB]">•</span>
                    <span>
                      <strong className="font-semibold text-[#1A1A1A]">전기화학 기반 에너지 변환</strong>
                      {" "}— 전기화학 열전 소자, 슈퍼커패시터
                    </span>
                  </li>
                </ul>

                <p className="mb-2 text-base font-bold text-[#1A1A1A]">지원 자격</p>
                <ul className="mb-6 space-y-2 text-base leading-relaxed text-[#666666]">
                  <li className="flex gap-2">
                    <span className="text-[#0047BB]">•</span>
                    <span>신소재공학, 화학공학, 화학 등 관련 전공자</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#0047BB]">•</span>
                    <span>에너지 소재·이차전지 연구에 관심과 열정이 있는 분</span>
                  </li>
                </ul>

                <p className="mb-2 text-base font-bold text-[#1A1A1A]">지원 방법</p>
                <p className="text-base leading-relaxed text-[#666666]">
                  이력서(CV)와 성적증명서를 첨부하여 아래 이메일로 문의해 주세요.
                </p>
              </div>

              {/* English */}
              <div className="lg:border-l lg:border-[#E5E5E5] lg:pl-12">
                <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#0047BB]">
                  English
                </span>
                <p className="mb-6 text-base leading-relaxed text-[#666666]">
                  The Advanced Energy Materials Laboratory (AEML), Department of Materials
                  Science and Engineering at Hongik University, is seeking motivated graduate
                  students. Under the guidance of Prof. Dongwook Lee, our lab studies the
                  materials and processes underlying sustainable energy and environmental
                  technologies.
                </p>

                <p className="mb-2 text-base font-bold text-[#1A1A1A]">Positions</p>
                <p className="mb-6 text-base leading-relaxed text-[#666666]">
                  MS · PhD · Integrated MS–PhD programs
                </p>

                <p className="mb-2 text-base font-bold text-[#1A1A1A]">Research Areas</p>
                <ul className="mb-6 space-y-2 text-base leading-relaxed text-[#666666]">
                  <li className="flex gap-2">
                    <span className="text-[#0047BB]">•</span>
                    <span>
                      <strong className="font-semibold text-[#1A1A1A]">Next-generation lithium battery materials</strong>
                      {" "}— Li-metal batteries, solid/composite electrolytes, high-Ni cathodes
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#0047BB]">•</span>
                    <span>
                      <strong className="font-semibold text-[#1A1A1A]">Solution processing and thin-film coating of 2D materials</strong>
                      {" "}— uniform wet deposition and drying
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#0047BB]">•</span>
                    <span>
                      <strong className="font-semibold text-[#1A1A1A]">Electrochemical energy conversion</strong>
                      {" "}— electrochemical thermopower and supercapacitors
                    </span>
                  </li>
                </ul>

                <p className="mb-2 text-base font-bold text-[#1A1A1A]">Qualifications</p>
                <ul className="mb-6 space-y-2 text-base leading-relaxed text-[#666666]">
                  <li className="flex gap-2">
                    <span className="text-[#0047BB]">•</span>
                    <span>Background in materials science, chemical engineering, chemistry, or a related field</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#0047BB]">•</span>
                    <span>Genuine interest and enthusiasm for energy materials and battery research</span>
                  </li>
                </ul>

                <p className="mb-2 text-base font-bold text-[#1A1A1A]">How to Apply</p>
                <p className="text-base leading-relaxed text-[#666666]">
                  Please send your CV and academic transcript to the email below.
                </p>
              </div>
            </div>

            {/* 이메일 버튼 */}
            <div className="mt-10 border-t border-[#E5E5E5] pt-8">
              <a
                href="mailto:dongwook@hongik.ac.kr"
                className="inline-flex items-center justify-center bg-[#0047BB] px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-[#003B99]"
              >
                지원 문의 · Email Prof. Dongwook Lee
              </a>
            </div>
          </div>
        </section>

        {/* 문의 안내 */}
        <section className="mx-auto mb-16 w-full max-w-[1440px] px-8 py-8 lg:px-16 lg:py-16">
          <div className="mx-auto max-w-[800px] border border-[#E5E5E5] bg-white p-10 text-left lg:p-12">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#0047BB]">
              INQUIRIES
            </h3>
            <div className="mb-6 h-0.5 w-10 bg-[#0047BB]" />
            <p className="mb-8 text-base leading-relaxed text-[#666666]">
              For questions about graduate admissions, research collaborations, or general
              inquiries, please reach out to Prof. Dongwook Lee directly via email. We welcome
              inquiries from prospective students and collaborators.
            </p>
            <a
              href="mailto:dongwook@hongik.ac.kr"
              className="inline-flex items-center justify-center bg-[#0047BB] px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-[#003B99]"
            >
              Send Email
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
