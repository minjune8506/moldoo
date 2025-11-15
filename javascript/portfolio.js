// Portfolio rendering: creates iframe cards from a videos array
document.addEventListener("DOMContentLoaded", () => {
  const videos = [
    {
      src: "https://www.youtube.com/embed/eY952SAPmIQ?si=MqsppPxZo2kaHQrB",
      title: "GYM2 청년취업GYM 오프닝 최종",
      caption: "모션그래픽",
    },
    {
      src: "https://www.youtube.com/embed/rTw0UMbUfl4?si=iOFcJPO_JGLD3wZi",
      title: "YouTube video player",
      caption: "모션그래픽",
    },
    {
      src: "https://www.youtube.com/embed/RmYgcA9n-uw?si=LLY_p0A-fiXRmB60",
      title: "YouTube video player",
      caption: "행사 홍보 영상",
    },
    {
      src: "https://www.youtube.com/embed/3zbLNaAljiM?si=aEKs7QtgcIiSdZ_k",
      title: "YouTube video player",
      caption: "행사 홍보 영상",
    },
    {
      src: "https://www.youtube.com/embed/2itCT-kxTWs?si=f07R6Nxbg3CNmJhR",
      title: "YouTube video player",
      caption: "브랜드 홍보 영상",
    },
    {
      src: "https://www.youtube.com/embed/exQZ6ou9h0U?si=OaJa5tUuqdXqntrq",
      title: "YouTube video player",
      caption: "브랜드 홍보 영상",
    },
    {
      src: "https://www.youtube.com/embed/WlxgOPa7UEU?si=MBsKTKAUpqHAqxgf",
      title: "YouTube video player",
      caption: "행사 스케치 영상",
    },
    {
      src: "https://www.youtube.com/embed/Pi5Md7LlT0k?si=O-CogDIWUcFx-dNZ",
      title: "YouTube video player",
      caption: "행사 스케치 영상",
    },
    {
      src: "https://www.youtube.com/embed/BuyKEkT-TC8?si=3-dAqdHVJYPfCw2s",
      title: "YouTube video player",
      caption: "공연 배경 및 무대 영상",
    },
    {
      src: "https://www.youtube.com/embed/SrERZSx8Sfk?si=DailA6RjzZ9jtjnH",
      title: "YouTube video player",
      caption: "공연 배경 및 무대 영상",
    },
    {
      src: "https://www.youtube.com/embed/S7v2u0DaM0s?si=UkSIDQxfjShnj2MT",
      title: "YouTube video player",
      caption: "교육용 콘텐츠 영상",
    },
    {
      src: "https://www.youtube.com/embed/Hg0LjMKes-g?si=DHEO3kncY6zu5ON_",
      title: "YouTube video player",
      caption: "교육용 콘텐츠 영상",
    },
    {
      src: "https://www.youtube.com/embed/D2IjZln83cQ?si=oditIDHMYl3em5IJ",
      title: "YouTube video player",
      caption: "SNS 콘텐츠",
    },
    {
      src: "https://youtube.com/embed/SgIJWre7e0s?si=0MpeH13K8PzPWXhO",
      title: "YouTube video player",
      caption: "SNS 콘텐츠",
    },
    {
      src: "https://youtube.com/embed/ROgu2cVH_Ts?si=UYfTUXvFwpalIcqU",
      title: "YouTube video player",
      caption: "SNS 콘텐츠",
    },
  ];

  const grid = document.querySelector(".portfolio-grid");
  if (!grid) return;
  grid.innerHTML = "";

  videos.forEach((v, index) => {
    const item = document.createElement("div");
    item.className = "portfolio-item";

    const videoWrap = document.createElement("div");
    videoWrap.className = "portfolio-video";

    const iframe = document.createElement("iframe");
    // Use data-src + lazy loading via IntersectionObserver to avoid loading all iframes at once
    iframe.dataset.src = v.src;
    iframe.title = v.title || "";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    );
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    iframe.setAttribute("allowfullscreen", "");
    iframe.loading = "lazy"; // hint for browsers that support it
    iframe.style.background = "transparent";
    iframe.style.border = "0";
    iframe.style.display = "block";
    iframe.style.width = "100%";
    iframe.style.height = "100%";

    // If the item is early (above the fold), load immediately to avoid perceived delay
    const EARLY_LOAD_COUNT = 3;
    if (index < EARLY_LOAD_COUNT) {
      iframe.src = v.src;
    }

    videoWrap.appendChild(iframe);

    const info = document.createElement("div");
    info.className = "portfolio-info";
    const h3 = document.createElement("h3");
    h3.textContent = v.caption || "";
    info.appendChild(h3);

    item.appendChild(videoWrap);
    item.appendChild(info);

    const hue = (index * 60) % 360;

    grid.appendChild(item);
  });

  // After creating items, lazy-load remaining iframes when they enter viewport
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
    // Fallback: load all if IntersectionObserver isn't available
    lazyIframes.forEach((f) => {
      if (!f.src && f.dataset && f.dataset.src) f.src = f.dataset.src;
    });
  }
});
