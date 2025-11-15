// Services rendering: creates service cards from a services array
document.addEventListener("DOMContentLoaded", () => {
  const services = [
    {
      icon: "assets/lightbulb.svg",
      title: "기획 & 콘셉트",
      desc: "브랜드 스토리를 담은 창의적인 영상 기획부터 콘셉트 개발까지 진행합니다.",
    },
    {
      icon: "assets/video.svg",
      title: "촬영 & 제작",
      desc: "최신 장비와 전문 인력을 통한 고품질 영상 촬영 및 제작을 제공합니다.",
    },
    {
      icon: "assets/edit.svg",
      title: "편집 & 후반작업",
      desc: "색보정, 모션그래픽, 사운드 디자인 등 완벽한 후반작업을 진행합니다.",
    },
    {
      icon: "assets/motion.svg",
      title: "모션그래픽",
      desc: "2D/3D 모션그래픽과 애니메이션으로 메시지를 효과적으로 전달합니다.",
    },
    {
      icon: "assets/phone.svg",
      title: "SNS 콘텐츠",
      desc: "인스타그램, 유튜브, 틱톡 등 각 플랫폼에 최적화된 콘텐츠를 제작합니다.",
    },
    {
      icon: "assets/consulting.svg",
      title: "컨설팅",
      desc: "영상 마케팅 전략 수립부터 배포 및 분석까지 컨설팅을 제공합니다.",
    },
  ];

  const servicesGrid = document.querySelector(".services-grid");
  if (!servicesGrid) return;
  servicesGrid.innerHTML = "";

  services.forEach((s) => {
    const card = document.createElement("div");
    card.className = "service-card";

    const iconWrap = document.createElement("div");
    iconWrap.className = "service-icon";
    const obj = document.createElement("object");
    obj.setAttribute("data", s.icon);
    obj.setAttribute("type", "image/svg+xml");
    iconWrap.appendChild(obj);

    const h3 = document.createElement("h3");
    h3.textContent = s.title;

    const p = document.createElement("p");
    p.textContent = s.desc;

    card.appendChild(iconWrap);
    card.appendChild(h3);
    card.appendChild(p);

    servicesGrid.appendChild(card);
  });
});
