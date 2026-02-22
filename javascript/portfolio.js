// Portfolio with tabs: FILM and DESIGN
document.addEventListener("DOMContentLoaded", () => {
  const videos = [
    {
      src: "https://www.youtube.com/embed/XrIR6-hb7X8?si=4lLE--VavXxxBpvH",
      title: "다시, 푸들 | 반려동물구조협회",
      caption: "다시, 푸들 | 반려동물구조협회",
    },
    {
      src: "https://www.youtube.com/embed/pC7Xsi3c9UQ?si=kjDjubc53VsaRZoU",
      title: "Rise on One | AI 뮤직비디오",
      caption: "Rise on One | AI 뮤직비디오",
    },
    {
      src: "https://www.youtube.com/embed/d5BJ5o_gF5Y?si=lYx-sCPMwRzXgKCh",
      title: "교육용 영상 | K-edu(PLANTGROW)",
      caption: "교육용 영상 | K-edu(PLANTGROW)",
    },
    {
      src: "https://www.youtube.com/embed/lrlWkzcqF1s?si=24GaWSeff3PmmTOt",
      title: "포트폴리오 영상 | MC진심",
      caption: "포트폴리오 영상 | MC진심",
    },
    {
      src: "https://www.youtube.com/embed/PMW_5Ycpx1I?si=UBvNDkj_YIyJYNNG",
      title: "덴마크 정자은행 | 메디칼티카",
      caption: "덴마크 정자은행 | 메디칼티카",
    },
    {
      src: "https://www.youtube.com/embed/8ewkAcvMPJ8?si=QYW98Ikg0-G5u638",
      title: "로맨스 코드 | 전북도민일보",
      caption: "로맨스 코드 | 전북도민일보",
    },
    {
      src: "https://www.youtube.com/embed/XrEeRc6gSkk?si=TA9EBpoHC2lAt2bc",
      title: "브랜드 영상 | 비아로",
      caption: "브랜드 영상 | 비아로",
    },
    {
      src: "https://www.youtube.com/embed/agN0QS8i1uk?si=PqZgCt16I--fNJtf",
      title: "브이로그 영상 | 개인",
      caption: "브이로그 영상 | 개인",
    },
    {
      src: "https://www.youtube.com/embed/Z6FHmi6E1ck?si=5POXUmWt61b6i2tl",
      title: "기업 영상 | 푸른파트너스",
      caption: "기업 영상 | 푸른파트너스",
    },
    {
      src: "https://www.youtube.com/embed/TetWejyUpv0?si=sqAf7kAXR2_lUyk3",
      title: "화성공모전",
      caption: "화성공모전",
    },
  ];

  // Get unique video categories
  const videoCategories = ["전체", ...new Set(videos.map((v) => v.category))];

  // Tab switching functionality
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabName = btn.getAttribute("data-tab");
      
      // Update active tab button
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      
      // Update active tab content
      tabContents.forEach((content) => content.classList.remove("active"));
      document.getElementById(`${tabName}-tab`)?.classList.add("active");
    });
  });

  function renderPortfolio(itemsToRender) {
    const board = document.querySelector(".portfolio-board");
    if (!board) return;
    board.innerHTML = "";

    itemsToRender.forEach((v, index) => {
      const card = document.createElement("div");
      card.className = "portfolio-card";
      card.setAttribute("data-category", v.category);

      const videoWrap = document.createElement("div");
      videoWrap.className = "portfolio-card-video";

      const iframe = document.createElement("iframe");
      iframe.dataset.src = v.src;
      iframe.title = v.title || "";
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      );
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      iframe.setAttribute("allowfullscreen", "");
      iframe.loading = "lazy";
      iframe.style.background = "transparent";
      iframe.style.border = "0";
      iframe.style.display = "block";
      iframe.style.width = "100%";
      iframe.style.height = "100%";

      const EARLY_LOAD_COUNT = 3;
      if (index < EARLY_LOAD_COUNT) {
        iframe.src = v.src;
      }

      videoWrap.appendChild(iframe);

      const info = document.createElement("div");
      info.className = "portfolio-card-info";
      
      const title = document.createElement("h3");
      title.className = "portfolio-card-title";
      title.textContent = v.caption || "";
      
      info.appendChild(title);

      card.appendChild(videoWrap);
      card.appendChild(info);

      board.appendChild(card);
    });

    // Lazy-load iframes
    const lazyIframes = document.querySelectorAll("iframe[data-src]");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const ifr = entry.target;
              if (ifr.dataset && ifr.dataset.src && !ifr.src) {
                ifr.src = ifr.dataset.src;
              }
              obs.unobserve(ifr);
            }
          });
        },
        { rootMargin: "200px 0px" }
      );

      lazyIframes.forEach((f) => {
        if (!f.src) io.observe(f);
      });
    } else {
      lazyIframes.forEach((f) => {
        if (!f.src && f.dataset && f.dataset.src) f.src = f.dataset.src;
      });
    }
  }

  // Initial render
  renderPortfolio(videos);
});
