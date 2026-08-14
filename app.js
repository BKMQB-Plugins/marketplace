const container = document.querySelector("#plugins");
const status = document.querySelector("#status");
const search = document.querySelector("#search");
const template = document.querySelector("#plugin-template");

const trustLabels = {
  official: "官方维护",
  verified: "已验证",
  community: "社区插件",
};

let plugins = [];

function render(query = "") {
  const normalized = query.trim().toLowerCase();
  const visible = plugins.filter((plugin) =>
    [plugin.id, plugin.name, plugin.summary, ...plugin.commands, ...plugin.capabilities]
      .join(" ")
      .toLowerCase()
      .includes(normalized),
  );

  container.replaceChildren();
  for (const plugin of visible) {
    const card = template.content.cloneNode(true);
    card.querySelector("h3").textContent = plugin.name;
    card.querySelector(".summary").textContent = plugin.summary;
    card.querySelector(".trust").textContent = trustLabels[plugin.trust] ?? plugin.trust;
    card.querySelector(".trust").dataset.trust = plugin.trust;
    card.querySelector(".version").textContent = `v${plugin.latest.version}`;
    card.querySelector(".commands").replaceChildren(
      ...plugin.commands.map((command) => {
        const item = document.createElement("code");
        item.textContent = `/${command}`;
        return item;
      }),
    );
    card.querySelector(".capabilities").replaceChildren(
      ...plugin.capabilities.map((capability) => {
        const item = document.createElement("li");
        item.textContent = capability;
        return item;
      }),
    );
    card.querySelector(".download").href = plugin.latest.download;
    card.querySelector(".source").href = plugin.repository;
    card.querySelector(".hash").textContent = `SHA-256 ${plugin.latest.sha256}`;
    container.append(card);
  }
  status.textContent = visible.length ? `共 ${visible.length} 个插件` : "没有匹配的插件";
}

search.addEventListener("input", () => render(search.value));

fetch("index.json")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then((index) => {
    plugins = index.plugins;
    render();
  })
  .catch((error) => {
    status.textContent = `市场索引读取失败：${error.message}`;
  });
