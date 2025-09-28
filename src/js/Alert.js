export default class Alert {
  constructor(alertUrl = "/json/alerts.json") {
    this.alertUrl = alertUrl;
  }

  async init() {
    try {
      const res = await fetch(this.alertUrl);
      if (!res.ok) throw new Error("Failed to fetch alerts");
      const alerts = await res.json();

      if (alerts.length > 0) {
        this.renderAlerts(alerts);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Alert error:", err);
    }
  }

  renderAlerts(alerts) {
    const alertSection = document.createElement("section");
    alertSection.classList.add("alert-list");

    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background || "black";
      p.style.color = alert.color || "white";
      p.style.padding = "1rem";
      p.style.margin = "0";
      alertSection.appendChild(p);
    });

    const main = document.querySelector("main");
    if (main) {
      main.prepend(alertSection);
    }
  }
}
