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
