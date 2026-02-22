// Design items rendering with category filtering
document.addEventListener("DOMContentLoaded", () => {
  const designItems = [
    {
      title: "로고 디자인",
      description: "브랜드의 정체성을 담은 창의적인 로고 디자인",
      image: "assets/design/achv.png",
    },
  ];


  function renderDesign(itemsToRender) {
    const board = document.querySelector(".design-board");
    if (!board) return;
    board.innerHTML = "";

    itemsToRender.forEach((item) => {
      const card = document.createElement("div");
      card.className = "design-card";
      card.setAttribute("data-category", item.category);

      const imageWrap = document.createElement("div");
      imageWrap.className = "design-card-image";
      
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.title;
      img.onerror = () => {
        // 이미지 로드 실패 시 플레이스홀더 표시
        imageWrap.style.background = "linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)";
        img.style.display = "none";
      };
      imageWrap.appendChild(img);

      const content = document.createElement("div");
      content.className = "design-card-content";

      const title = document.createElement("h3");
      title.className = "design-card-title";
      title.textContent = item.title;

      const desc = document.createElement("p");
      desc.className = "design-card-desc";
      desc.textContent = item.description;

      content.appendChild(title);
      content.appendChild(desc);

      card.appendChild(imageWrap);
      card.appendChild(content);

      board.appendChild(card);
    });
  }

  // Initial render
  renderDesign(designItems);
});
