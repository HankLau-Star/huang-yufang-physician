"use client";

import { useEffect, useRef, useState } from "react";

const westernExpertise = [
  {
    code: "01",
    title: "儿科常见病与多发病",
    text: "重视完整问诊、规范查体与病情分层，结合儿童年龄特点制定个体化诊疗思路。",
  },
  {
    code: "02",
    title: "危重症识别与救治",
    text: "具备长期一线临床经验，注重早期识别风险、及时处置与必要时规范转诊。",
  },
  {
    code: "03",
    title: "基层全科临床经验",
    text: "二十余年扎根乡卫生院，对基层常见健康问题与连续性照护有深切理解。",
  },
];

const tcmMethods = ["贴敷", "推拿", "拔罐", "针灸"];

const timeline = [
  {
    period: "医学起点",
    title: "河南大学 · 临床医学本科",
    text: "毕业于河南大学（双一流建设高校），接受系统的西医临床医学教育。",
  },
  {
    period: "五年历练",
    title: "上海长海医院 · 学习及工作",
    text: "曾在海军军医大学第一附属医院（对外俗称“上海长海医院”或“长海医院”）学习并工作5年。",
  },
  {
    period: "二十余年",
    title: "扎根乡卫生院",
    text: "回到家乡后进入乡卫生院工作二十余年，在基层一线守护群众健康。",
  },
  {
    period: "专业深耕",
    title: "新郑市妇幼保健院",
    text: "后调入新郑市妇幼保健院工作，长期从事儿科临床诊疗，现已退休。",
  },
  {
    period: "持续进修",
    title: "省级医院 · 一年进修",
    text: "曾在河南省人民医院及河南省儿童医院进修学习1年，持续精进儿科诊疗与危重症救治能力。",
  },
  {
    period: "当下 · 在学",
    title: "国家卫健委“西学中”培训",
    text: "国家卫健委“西医学习中医”两年期培训首批学员，现处于系统学习与临床实习阶段。",
    current: true,
  },
];

export default function Home() {
  const shellRef = useRef<HTMLDivElement>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [copyLabel, setCopyLabel] = useState("复制号码");
  const [activeSection, setActiveSection] = useState("top");

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText("15038264053");
      setCopyLabel("已复制");
      window.setTimeout(() => setCopyLabel("复制号码"), 1800);
    } catch {
      setCopyLabel("请长按号码复制");
      window.setTimeout(() => setCopyLabel("复制号码"), 2200);
    }
  };

  useEffect(() => {
    const shell = shellRef.current;
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    let observer: IntersectionObserver | undefined;

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).dataset.visible = "true";
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -6%" },
      );
      reveals.forEach((item) => observer?.observe(item));
    } else {
      reveals.forEach((item) => {
        item.dataset.visible = "true";
      });
    }

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      shell?.style.setProperty("--scroll-progress", String(progress));
      document.body.dataset.scrolled = window.scrollY > 24 ? "true" : "false";
    };
    const onPointerMove = (event: PointerEvent) => {
      shell?.style.setProperty("--pointer-x", `${event.clientX}px`);
      shell?.style.setProperty("--pointer-y", `${event.clientY}px`);
      shell?.style.setProperty(
        "--portrait-tilt-x",
        `${((event.clientY / window.innerHeight) - 0.5) * -1.6}deg`,
      );
      shell?.style.setProperty(
        "--portrait-tilt-y",
        `${((event.clientX / window.innerWidth) - 0.5) * 1.8}deg`,
      );
    };

    const sections = ["top", "profile", "expertise", "journey", "statement", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58%", threshold: [0.01, 0.15, 0.35] },
    );
    sections.forEach((section) => sectionObserver.observe(section));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    return () => {
      observer?.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      delete document.body.dataset.scrolled;
    };
  }, []);

  useEffect(() => {
    if (!contactOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setContactOpen(false);
    };
    document.body.dataset.contactOpen = "true";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      delete document.body.dataset.contactOpen;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [contactOpen]);

  return (
    <div className="site-shell" ref={shellRef}>
      <a className="skip-link" href="#main-content">
        跳至主要内容
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="pointer-aura" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="黄玉芳医师首页">
          <span className="brand-seal" aria-hidden="true">
            黄
          </span>
          <span className="brand-copy">
            <strong>黄玉芳医师</strong>
            <small>HUANG YUFANG · PHYSICIAN</small>
          </span>
        </a>
        <nav className="main-nav" aria-label="主导航">
          <a href="#profile" data-active={activeSection === "profile"}>医者简介</a>
          <a href="#expertise" data-active={activeSection === "expertise"}>专业方向</a>
          <a href="#journey" data-active={activeSection === "journey"}>从医履历</a>
          <a href="#statement" data-active={activeSection === "statement"}>医者自述</a>
        </nav>
        <button className="header-action" type="button" onClick={() => setContactOpen(true)}>
          联系咨询 <span aria-hidden="true">＋</span>
        </button>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orbit orbit-one" aria-hidden="true" />
          <div className="hero-orbit orbit-two" aria-hidden="true" />
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span className="pulse-dot" aria-hidden="true" />
              西医临床执业医师 · 中医适宜技术研修
            </div>
            <div className="hero-title-wrap">
              <p className="hero-kicker">CLINICAL MEDICINE · INTEGRATIVE CARE</p>
              <h1 id="hero-title">
                黄玉芳
                <span>医师</span>
              </h1>
              <div className="hero-name-english" aria-label="Huang Yufang physician">
                <span>HUANG YUFANG</span>
                <i aria-hidden="true" />
                <small>PHYSICIAN</small>
              </div>
            </div>
            <p className="hero-lead">
              以规范临床守护生命，以持续求知融汇中西。
              <br />
              走过三甲医院、基层卫生院与妇幼保健一线，始终把患者放在诊疗的中心。
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#profile">
                了解医者生涯 <span aria-hidden="true">↓</span>
              </a>
              <a className="text-button" href="#expertise">
                查看专业方向 <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="credentials-strip" aria-label="核心资历">
              <div>
                <strong>临床医学本科</strong>
                <span>河南大学</span>
              </div>
              <div>
                <strong>5年</strong>
                <span>上海长海医院学习工作</span>
              </div>
              <div>
                <strong>20余年</strong>
                <span>基层卫生院一线经验</span>
              </div>
            </div>
          </div>

          <figure className="hero-portrait">
            <div className="portrait-line line-a" aria-hidden="true" />
            <div className="portrait-line line-b" aria-hidden="true" />
            <img
              src="/huang-yufang-consultation.jpg"
              alt="黄玉芳医师身着白大褂在诊室坐诊"
            />
            <div className="portrait-shade" aria-hidden="true" />
            <figcaption>
              <span>医者仁心</span>
              <strong>厚德 · 精诚</strong>
            </figcaption>
            <div className="portrait-index" aria-hidden="true">
              01 / 03
            </div>
          </figure>

          <div className="hero-side-note" aria-hidden="true">
            <span>仁</span>
            <i />
            <small>BENEVOLENCE</small>
          </div>
          <div className="hero-personal-seal" aria-label="玉芳医者印">
            <span>玉</span><span>芳</span><span>医</span><span>者</span>
          </div>
        </section>

        <div className="principle-ticker" aria-label="从医信念">
          <div>
            <span>仁心</span><i>◆</i><span>笃学</span><i>◆</i>
            <span>审慎</span><i>◆</i><span>守正</span><i>◆</i>
            <span>融汇</span><i>◆</i><span>济世</span><i>◆</i>
          </div>
        </div>

        <section className="manifesto section-pad" aria-labelledby="manifesto-title">
          <div className="manifesto-mark" aria-hidden="true">
            醫
          </div>
          <div className="manifesto-copy" data-reveal>
            <p className="section-index">01 / 医者之心</p>
            <p className="section-english">THE HEART OF MEDICINE</p>
            <h2 id="manifesto-title">
              医术是理性的尺度，
              <br />
              <em>仁心是医学的温度。</em>
            </h2>
            <p>
              从军医大学附属医院的规范训练，到乡卫生院二十余年的扎根，再到妇幼保健领域的专业深耕，
              岗位在变，对生命的敬畏、对证据的尊重与对患者的耐心始终未变。
            </p>
          </div>
          <div className="manifesto-note" data-reveal>
            <span className="note-rule" />
            <p>以西医临床为根基，以中医思维拓宽照护视角；守住规范与边界，一切以患者真正受益为归处。</p>
          </div>
        </section>

        <section className="profile section-pad" id="profile" aria-labelledby="profile-title">
          <div className="profile-images" data-reveal>
            <figure className="profile-image-main">
              <img
                src="/huang-yufang-practice.jpg"
                alt="黄玉芳医师在诊室整理病例资料"
                loading="lazy"
              />
              <figcaption>严谨诊疗 · 细致问询</figcaption>
            </figure>
            <figure className="profile-image-small">
              <img
                src="/huang-yufang-service.jpg"
                alt="黄玉芳医师身着防护服参与医疗工作"
                loading="lazy"
              />
              <figcaption>
                <strong>医者担当</strong>
                <span>守护从不缺席</span>
              </figcaption>
            </figure>
            <div className="image-coordinate" aria-hidden="true">
              34.39° N · HENAN
            </div>
          </div>

          <div className="profile-copy" data-reveal>
            <p className="section-index">02 / 医者简介</p>
            <div className="section-heading">
              <span className="vertical-label">ABOUT THE PHYSICIAN</span>
              <h2 id="profile-title">
                临床经验与持续求学
                <br />
                <em>相互照亮</em>
              </h2>
            </div>
            <p className="profile-intro">
              黄玉芳，西医临床执业医师，河南大学临床医学本科毕业，
              新郑市妇幼保健院退休医师。职业经历横跨大型三甲医院、基层卫生院与妇幼保健机构，
              长期专注儿科常见病、多发病诊疗及危重症识别与救治。
            </p>
            <dl className="fact-list">
              <div>
                <dt>专业根基</dt>
                <dd>西医临床 · 儿科诊疗</dd>
              </div>
              <div>
                <dt>执业经历</dt>
                <dd>基层医疗 · 妇幼保健</dd>
              </div>
              <div>
                <dt>持续研修</dt>
                <dd>西学中培训 · 中医适宜技术</dd>
              </div>
            </dl>
            <blockquote>
              <span aria-hidden="true">“</span>
              对每一位患者，多问一句，多想一步；对每一次诊疗，心存敬畏，守住分寸。
            </blockquote>
          </div>
        </section>

        <section className="expertise section-pad" id="expertise" aria-labelledby="expertise-title">
          <div className="expertise-heading" data-reveal>
            <p className="section-index light">03 / 专业方向</p>
            <p className="section-english light">CLINICAL PRACTICE · INTEGRATIVE STUDY</p>
            <h2 id="expertise-title">
              现代临床为基
              <span>东方医理为翼</span>
            </h2>
            <p>
              坚持规范评估、病情分层与循证思维，在持续学习中审慎探索中医适宜技术的合理应用，
              让现代临床的严谨与整体照护的温度彼此补充。
            </p>
          </div>

          <div className="medicine-columns">
            <div className="medicine-panel western-panel" data-reveal>
              <div className="panel-heading">
                <span className="panel-symbol" aria-hidden="true">十</span>
                <div>
                  <small>WESTERN MEDICINE</small>
                  <h3>西医临床</h3>
                </div>
                <span className="panel-number">A</span>
              </div>
              <div className="expertise-list">
                {westernExpertise.map((item) => (
                  <article key={item.code}>
                    <span>{item.code}</span>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="medicine-panel tcm-panel" data-reveal>
              <div className="panel-heading">
                <span className="panel-symbol tcm-symbol" aria-hidden="true">和</span>
                <div>
                  <small>TRADITIONAL CHINESE MEDICINE</small>
                  <h3>中医研修</h3>
                </div>
                <span className="panel-number">B</span>
              </div>
              <p className="tcm-lead">
                目前参加国家卫健委“西医学习中医”两年期培训，并在具有中医及中西医结合师资的诊所持续学习与实习。
              </p>
              <div className="method-grid">
                {tcmMethods.map((method, index) => (
                  <span key={method}>
                    <i>{String(index + 1).padStart(2, "0")}</i>
                    {method}
                  </span>
                ))}
              </div>
              <div className="tcm-scope">
                <span>关注方向</span>
                <p>呼吸系统 · 消化系统 · 中风后康复 · 颈腰椎相关不适</p>
              </div>
              <p className="panel-caveat">
                中医适宜技术的具体应用，须经当面辨证、风险评估并结合个体情况决定。
              </p>
            </div>
          </div>
        </section>

        <section className="journey section-pad" id="journey" aria-labelledby="journey-title">
          <div className="journey-heading" data-reveal>
            <div>
              <p className="section-index">04 / 从医履历</p>
              <p className="section-english">A LIFE IN MEDICINE</p>
              <h2 id="journey-title">
                路虽远，
                <br />
                <em>学不止。</em>
              </h2>
            </div>
            <p>
              从规范化临床训练到基层长期实践，从儿科专业深耕到系统学习中医——
              医学之路，不只关乎经验的积累，也关乎一生持续求证、审慎更新与精进。
            </p>
          </div>

          <ol className="timeline">
            {timeline.map((item, index) => (
              <li key={item.title} className={item.current ? "is-current" : ""} data-reveal>
                <div className="timeline-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="timeline-period">{item.period}</div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                {item.current && <span className="current-badge">正在进行</span>}
              </li>
            ))}
          </ol>
        </section>

        <section className="statement section-pad" id="statement" aria-labelledby="statement-title">
          <div className="statement-rings" aria-hidden="true">
            <span /><span /><span />
          </div>
          <div className="statement-label" aria-hidden="true">医 者 自 述</div>
          <div className="statement-copy" data-reveal>
            <p className="section-index light">05 / 医者自述</p>
            <p className="section-english light centered">IN HER OWN WORDS</p>
            <h2 id="statement-title">“我非常热爱中医。”</h2>
            <p>
              目前我是国家卫健委“西医学习中医”两年期培训的首批学员，正在系统学习和临床实习。
              所在诊所有国家推广的中医适宜技术，也有中西医结合老师指导。我常跟随中医老师认真学习，
              也经常外出参加培训，不断精进贴敷、推拿、拔罐、针灸等技术。
            </p>
            <p>
              我相信，中医文化会在守正创新与规范实践中不断焕发生命力。愿以所学服务患者，济世传承。
            </p>
            <div className="statement-signature">
              <span>黄玉芳</span>
              <i />
              <small>谨述</small>
            </div>
          </div>
          <div className="statement-seal" aria-label="仁心济世">
            <span>仁心</span>
            <span>济世</span>
          </div>
        </section>

        <section className="contact-section section-pad" id="contact" aria-labelledby="contact-title">
          <div className="contact-watermark" aria-hidden="true">聯</div>
          <div className="contact-heading" data-reveal>
            <p className="section-index light">06 / 联系与就诊</p>
            <p className="section-english light">CONTACT · APPOINTMENT INFORMATION</p>
            <h2 id="contact-title">先确认安排，<br /><em>再安心就诊。</em></h2>
            <p>
              电话用于咨询出诊时间、执业地点与就诊安排。为保证诊疗安全，具体病情判断、处方与治疗方案需经当面评估后确定。
            </p>
          </div>

          <div className="contact-console" data-reveal>
            <div className="contact-status">
              <span><i aria-hidden="true" /> PHONE CONTACT</span>
              <small>河南 · 新郑</small>
            </div>
            <a className="contact-number" href="tel:15038264053" aria-label="拨打黄玉芳医师联系电话 150 3826 4053">
              <span>150</span><span>3826</span><span>4053</span>
            </a>
            <div className="contact-actions">
              <a className="contact-call" href="tel:15038264053">
                <span aria-hidden="true">↗</span>
                <strong>立即拨打</strong>
                <small>CALL NOW</small>
              </a>
              <button className="contact-copy" type="button" onClick={copyPhone}>
                <span aria-hidden="true">□</span>
                <strong>{copyLabel}</strong>
                <small>COPY NUMBER</small>
              </button>
            </div>
            <div className="contact-guidance">
              <div><span>01</span><p><strong>电话咨询</strong>说明希望了解出诊或就诊安排</p></div>
              <div><span>02</span><p><strong>确认信息</strong>以当前执业机构最新公示为准</p></div>
              <div><span>03</span><p><strong>紧急情况</strong>请立即前往急救机构或拨打120</p></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-seal" aria-hidden="true">黄</span>
          <div>
            <strong>黄玉芳医师</strong>
            <small>守正 · 仁心 · 融汇中西</small>
          </div>
        </div>
        <p>
          本站内容仅作医师个人经历与专业方向介绍，不替代面对面诊断、处方或个体化医疗建议。
        </p>
        <a href="#top" aria-label="返回页面顶部">返回顶部 ↑</a>
      </footer>

      <button
        className="floating-contact"
        type="button"
        onClick={() => setContactOpen(true)}
        aria-label="打开联系黄玉芳医师的方式"
      >
        <span aria-hidden="true">联</span>
        <strong>联系医师</strong>
        <small>CONTACT</small>
      </button>

      {contactOpen && (
        <div className="contact-sheet">
          <button className="contact-backdrop" type="button" onClick={() => setContactOpen(false)} aria-label="关闭联系窗口" />
          <section className="contact-sheet-panel" role="dialog" aria-modal="true" aria-labelledby="contact-sheet-title">
            <button className="contact-sheet-close" type="button" onClick={() => setContactOpen(false)} aria-label="关闭">×</button>
            <div className="contact-sheet-seal" aria-hidden="true">医</div>
            <p>CONTACT · 联系方式</p>
            <h2 id="contact-sheet-title">联系黄玉芳医师</h2>
            <span className="contact-sheet-note">咨询出诊时间、执业地点与就诊安排</span>
            <a className="contact-sheet-number" href="tel:15038264053">150 3826 4053</a>
            <div className="contact-sheet-actions">
              <a href="tel:15038264053"><span aria-hidden="true">↗</span>立即拨打</a>
              <button type="button" onClick={copyPhone}><span aria-hidden="true">□</span>{copyLabel}</button>
            </div>
            <small>具体诊疗须经当面评估；急危重症请拨打120或立即前往急救机构。</small>
          </section>
        </div>
      )}

      <div className="copy-toast" role="status" aria-live="polite" data-visible={copyLabel !== "复制号码"}>
        {copyLabel}
      </div>

      <nav className="mobile-dock" aria-label="移动端导航">
        <a href="#profile"><span>介</span>简介</a>
        <a href="#expertise"><span>专</span>专长</a>
        <a href="#journey"><span>历</span>履历</a>
        <button type="button" onClick={() => setContactOpen(true)} aria-label="打开联系方式"><span>联</span>联系</button>
      </nav>
    </div>
  );
}
