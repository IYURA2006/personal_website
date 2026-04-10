/* ======================================================
   YURII OS — edit these constants to wire in your stuff
   ====================================================== */
const CONFIG = {
  GITHUB_USER:   "yurii-ilnytskyi",          // ← your github username
  GITHUB_URL:    "https://github.com/yurii-ilnytskyi",
  LINKEDIN_URL:  "https://linkedin.com/in/yurii-ilnytskyi",
  EMAIL:         "yurii@example.com",
  CV_PDF:        "assets/cv.pdf",            // ← drop your CV here
  THRESHOLD_URL: "https://threshold-hackathon.example.com", // ← replace with real URL
};

const isMobile = window.matchMedia("(max-width:780px)").matches;

/* ============ App definitions ============ */
const APPS = {

  projects: {
    title:"Projects — Finder", w:780, h:500,
    render: () => {
      const items = [
        {n:"AI Terminal",      e:"🤖", m:"1st place · Huawei",   url:"#", badge:"🥇"},
        {n:"Threshold",        e:"♿",  m:"Accessible Fringe",    url:CONFIG.THRESHOLD_URL, badge:"NEW"},
        {n:"Food Order App",   e:"🍔", m:"Full-stack",            url:"#"},
        {n:"Study Tutor",      e:"📚", m:"LLM-powered",           url:"#"},
        {n:"Portfolio OS",     e:"💻", m:"This site",             url:"#"},
        {n:"More soon…",       e:"✨", m:"",                      url:"#"},
      ];
      return `
      <div class="finder">
        <div class="side">
          <h4>Favourites</h4>
          <a class="act">📁 Projects</a>
          <a>⏱ Recents</a>
          <a>⭐ Starred</a>
          <h4>Locations</h4>
          <a>💻 Yurii's Mac</a>
          <a>☁ iCloud</a>
          <h4>Tags</h4>
          <a>🔴 AI</a>
          <a>🟡 Web</a>
          <a>🟢 Accessibility</a>
        </div>
        <div class="main">
          ${items.map(p=>`
            <a class="pcard" href="${p.url}" ${p.url.startsWith("http")?'target="_blank" rel="noopener"':""}>
              <div class="ic">${p.e}${p.badge?`<div class="badge">${p.badge}</div>`:""}</div>
              <div class="nm">${p.n}</div>
              <div class="meta">${p.m}</div>
            </a>
          `).join("")}
        </div>
      </div>`;
    }
  },

  about: {
    title:"About Me.rtf — TextEdit", w:580, h:560,
    render: () => `
      <div class="textedit">
        <h1>About Me</h1>
        <div class="sub">~/Documents/about.rtf · modified just now</div>
        <p>Hi — I'm <b>Yurii Ilnytskyi</b>, a Computer Science student at the University of Edinburgh.</p>
        <p>I care about the unglamorous gap between <em>"it ran in the demo"</em> and <em>"it works in production."</em> Most of the things I build start because something annoyed me into building them.</p>
        <p>Last year I won first place at the Huawei hackathon for an AI terminal. The night after, instead of celebrating, I stayed up reading papers — because I realised I had no idea whether what I built would still hold together next Tuesday. Closing that gap is the work I want to do.</p>
        <p>Most recently I built <em>Threshold</em> at an accessible-fringe hackathon — a project focused on making the festival more navigable for people with access needs.</p>
        <div class="tags">
          <span>python</span><span>html</span><span>css</span><span>javascript</span>
          <span>typescript</span><span>react</span><span>node</span><span>fastapi</span>
          <span>postgres</span><span>docker</span><span>git</span><span>linux</span>
          <span>llm-eval</span>
        </div>
        <p style="opacity:.5;font-size:12px;margin-top:24px">— double-tap any icon to explore.</p>
      </div>`
  },

  terminal: {
    title:"yurii@macbook — -zsh", w:640, h:400,
    render: () => `
      <div class="terminal" id="termBody">
        <div class="line"><span class="ok">Last login: ${new Date().toDateString()} on ttys001</span></div>
        <div class="line">Welcome to <span class="ok">yurii-os</span>. Type <span class="ok">help</span> to get started.</div>
        <div id="termOut"></div>
        <div class="input-row" id="termRow">
          <span class="prompt">yurii@macbook</span><span class="path">~</span><span class="prompt">$</span>
          <input id="termInput" autocomplete="off" autocapitalize="off" spellcheck="false">
        </div>
      </div>`,
    onMount: (root) => {
      const out = root.querySelector("#termOut");
      const inp = root.querySelector("#termInput");
      const body = root.querySelector("#termBody");
      const print = (html, cls="") => {
        const d = document.createElement("div");
        d.className = "line " + cls; d.innerHTML = html;
        out.appendChild(d); body.scrollTop = body.scrollHeight;
      };
      const echo = c => print(`<span class="prompt">yurii@macbook</span><span class="path">~</span><span class="prompt">$</span> ${c}`);
      const cmds = {
        help: () => print("available: <span class='ok'>about, ls, projects, skills, contact, github, cv, whoami, sudo, neofetch, clear, exit</span>"),
        about: () => print("Yurii Ilnytskyi · CS @ University of Edinburgh · builds things that actually work."),
        whoami: () => print("yurii"),
        ls: () => print("about.rtf  projects/  cv.pdf  contact.vcf  .secrets"),
        projects: () => print("• AI Terminal      (1st place, Huawei Hackathon)\n• Threshold        (Accessible Fringe hackathon)\n• Food Ordering App\n• Study Tutor\n• Portfolio OS    ← you are here"),
        skills: () => print("python · html · css · javascript · typescript · react · node · fastapi · postgres · docker · linux"),
        contact: () => print(`email: ${CONFIG.EMAIL}\ngithub: ${CONFIG.GITHUB_URL}\nlinkedin: ${CONFIG.LINKEDIN_URL}`),
        github: () => { print("opening github.com…"); window.open(CONFIG.GITHUB_URL,"_blank"); },
        cv: () => { print("opening cv.pdf…"); openApp("resume"); },
        sudo: () => print("yurii is not in the sudoers file. This incident will be reported.","err"),
        neofetch: () => print(
`<span class="ok">         yurii@macbook</span>
         --------------
<span class="path">OS</span>:       yurii-os 1.0
<span class="path">Host</span>:     MacBook Portfolio
<span class="path">Kernel</span>:   javascript-vanilla
<span class="path">Uptime</span>:   ${(performance.now()/1000).toFixed(0)}s
<span class="path">Shell</span>:    zsh 5.9
<span class="path">Editor</span>:   vim (obviously)
<span class="path">Coffee</span>:   ☕☕☕`),
        clear: () => { out.innerHTML = ""; },
        exit: () => closeApp("terminal"),
      };
      inp.addEventListener("keydown", e => {
        if (e.key === "Enter") {
          const v = inp.value.trim(); inp.value = "";
          if (!v) return;
          echo(v);
          const fn = cmds[v.split(" ")[0]];
          if (fn) fn();
          else print(`zsh: command not found: ${v}`, "err");
        }
      });
      setTimeout(() => inp.focus(), 50);
    }
  },

  resume: {
    title:"Yurii_Ilnytskyi_CV.pdf — Preview", w:640, h:640,
    render: () => `
      <div style="height:100%;display:flex;flex-direction:column">
        <iframe class="resume-pdf" src="${CONFIG.CV_PDF}" id="cvFrame"
                onerror="this.style.display='none'"></iframe>
      </div>`,
    onMount: (root) => {
      // If the PDF fails to load (404), fall back to inline HTML resume.
      const f = root.querySelector("#cvFrame");
      const wrapper = root.querySelector(".body");
      // Heuristic: try to fetch first
      fetch(CONFIG.CV_PDF, {method:"HEAD"}).then(r => {
        if (!r.ok) throw new Error("no pdf");
      }).catch(() => {
        wrapper.innerHTML = `
        <div class="resume">
          <h1>Yurii Ilnytskyi</h1>
          <div class="role">Computer Science · University of Edinburgh · Cumbernauld, UK</div>

          <h2>Experience</h2>
          <div class="item"><b>Huawei Hackathon — Team Lead <span>· 2025 · 🥇 1st place</span></b>Led a small team to first place. Built an AI terminal that translates natural language into safe shell operations.</div>
          <div class="item"><b>Threshold — Accessible Fringe Hackathon <span>· 2025</span></b>Built a tool to make the Edinburgh Festival Fringe more navigable for people with access needs.</div>
          <div class="item"><b>Citadel · Quant Programme <span>· 2024</span></b>Selected for a competitive quantitative programme.</div>
          <div class="item"><b>Softjourn · Software Intern <span>· 2023</span></b>Shipped production features. Learned why code review exists.</div>

          <h2>Education</h2>
          <div class="item"><b>BSc Computer Science <span>· University of Edinburgh · 2024 – present</span></b>Algorithms, data structures, machine learning, systems.</div>

          <h2>Skills</h2>
          <div class="skills">
            <span>Python</span><span>HTML</span><span>CSS</span><span>JavaScript</span>
            <span>TypeScript</span><span>React</span><span>Node</span><span>FastAPI</span>
            <span>PostgreSQL</span><span>Docker</span><span>Git</span><span>Linux</span>
          </div>
          <p style="margin-top:20px;font-size:11px;color:#999;font-family:var(--font)">
            ↪ drop your real CV at <code>assets/cv.pdf</code> to replace this view.
          </p>
        </div>`;
      });
    }
  },

  contact: {
    title:"Contact", w:460, h:440,
    render: () => `
      <div class="contact">
        <h2>Let's talk</h2>
        <a class="row" href="mailto:${CONFIG.EMAIL}"><span class="ic">📧</span><div><b>Email</b><span>${CONFIG.EMAIL}</span></div></a>
        <a class="row" href="${CONFIG.GITHUB_URL}" target="_blank" rel="noopener"><span class="ic">💻</span><div><b>GitHub</b><span>${CONFIG.GITHUB_URL.replace(/^https?:\/\//,"")}</span></div></a>
        <a class="row" href="${CONFIG.LINKEDIN_URL}" target="_blank" rel="noopener"><span class="ic">💼</span><div><b>LinkedIn</b><span>${CONFIG.LINKEDIN_URL.replace(/^https?:\/\//,"")}</span></div></a>
        <a class="row"><span class="ic">📍</span><div><b>Location</b><span>Cumbernauld → Edinburgh, Scotland</span></div></a>
      </div>`
  },

  github: {
    title:"GitHub — Safari", w:680, h:520,
    render: () => `
      <div class="gh">
        <div class="loading" id="ghLoading">Loading github.com/${CONFIG.GITHUB_USER}…</div>
      </div>`,
    onMount: async (root) => {
      const wrap = root.querySelector(".gh");
      try {
        const [u, r] = await Promise.all([
          fetch(`https://api.github.com/users/${CONFIG.GITHUB_USER}`).then(r=>r.json()),
          fetch(`https://api.github.com/users/${CONFIG.GITHUB_USER}/repos?sort=updated&per_page=10`).then(r=>r.json()),
        ]);
        if (u.message) throw new Error(u.message);
        const repos = Array.isArray(r) ? r : [];
        wrap.innerHTML = `
          <div class="head">
            <img src="${u.avatar_url}" alt="">
            <div>
              <h2>${u.name || u.login}</h2>
              <div class="login">@${u.login}</div>
              ${u.bio ? `<div class="bio">${u.bio}</div>` : ""}
            </div>
          </div>
          <div class="stats">
            <span><b>${u.public_repos}</b> repos</span>
            <span><b>${u.followers}</b> followers</span>
            <span><b>${u.following}</b> following</span>
            ${u.location ? `<span>📍 ${u.location}</span>` : ""}
          </div>
          <a class="open-btn" href="${u.html_url}" target="_blank" rel="noopener">Open on github.com →</a>
          <div class="repos">
            ${repos.map(rp => `
              <a class="repo" href="${rp.html_url}" target="_blank" rel="noopener" style="display:block">
                <h3>${rp.name}</h3>
                ${rp.description ? `<p>${rp.description}</p>` : ""}
                <div class="meta">
                  ${rp.language ? `<span class="lang"><span class="dot"></span>${rp.language}</span>` : ""}
                  <span>★ ${rp.stargazers_count}</span>
                  <span>⑂ ${rp.forks_count}</span>
                </div>
              </a>
            `).join("") || "<p style='color:#7d8590;padding:10px'>No public repos found.</p>"}
          </div>`;
      } catch (e) {
        wrap.innerHTML = `
          <div class="err">
            Couldn't load <b>${CONFIG.GITHUB_USER}</b>.<br>
            <small>${e.message || "network error"}</small><br><br>
            Edit <code>CONFIG.GITHUB_USER</code> at the top of <code>app.js</code>.
          </div>
          <a class="open-btn" href="${CONFIG.GITHUB_URL}" target="_blank" rel="noopener">Open github.com →</a>`;
      }
    }
  },
};

/* ============ Window manager ============ */
let zTop = 100;
const openWindows = {};
const windowsRoot = document.getElementById("windows");

function openApp(id){
  if (openWindows[id]) { focusApp(id); return; }
  const app = APPS[id]; if (!app) return;
  const el = document.createElement("div");
  el.className = "win"; el.dataset.id = id;
  if (!isMobile) {
    const w = app.w, h = app.h;
    const x = Math.max(20, Math.round(window.innerWidth/2 - w/2 + (Math.random()*60-30)));
    const y = Math.max(40, Math.round(window.innerHeight/2 - h/2 + (Math.random()*40-20)));
    el.style.left = x+"px"; el.style.top = y+"px";
    el.style.width = w+"px"; el.style.height = h+"px";
  }
  el.innerHTML = `
    <div class="titlebar">
      <div class="lights">
        <button class="light r" data-act="close"><span>×</span></button>
        <button class="light y" data-act="min"><span>−</span></button>
        <button class="light g" data-act="max"><span>+</span></button>
      </div>
      <div class="title">${app.title}</div>
      <div style="width:52px"></div>
    </div>
    <div class="body">${app.render()}</div>`;
  windowsRoot.appendChild(el);
  openWindows[id] = { el, app };
  focusApp(id);
  if (!isMobile) makeDraggable(el);
  el.addEventListener("mousedown", () => focusApp(id));
  el.querySelectorAll(".light").forEach(b => {
    b.addEventListener("click", e => {
      e.stopPropagation();
      const a = b.dataset.act;
      if (a === "close") closeApp(id);
      else if (a === "min") minimizeApp(id);
      else if (a === "max") toggleMax(id);
    });
  });
  if (app.onMount) app.onMount(el);
  document.querySelector(`.dockitem[data-app="${id}"]`)?.classList.add("run");
}

function focusApp(id){
  zTop++;
  openWindows[id].el.style.zIndex = zTop;
  const t = APPS[id].title;
  document.getElementById("activeApp").textContent = t.split(" — ")[1] || t;
}
function closeApp(id){
  const w = openWindows[id]; if (!w) return;
  w.el.classList.add("closing");
  setTimeout(() => {
    w.el.remove(); delete openWindows[id];
    document.querySelector(`.dockitem[data-app="${id}"]`)?.classList.remove("run");
  }, 240);
}
function minimizeApp(id){
  const w = openWindows[id]; if (!w) return;
  w.el.classList.add("minimizing");
  setTimeout(() => {
    w.el.remove(); delete openWindows[id];
    document.querySelector(`.dockitem[data-app="${id}"]`)?.classList.remove("run");
  }, 340);
}
function toggleMax(id){
  if (isMobile) return; // already fullscreen on mobile
  const el = openWindows[id].el;
  if (el.dataset.max){
    el.style.left = el.dataset.ox; el.style.top = el.dataset.oy;
    el.style.width = el.dataset.ow; el.style.height = el.dataset.oh;
    delete el.dataset.max;
  } else {
    el.dataset.ox = el.style.left; el.dataset.oy = el.style.top;
    el.dataset.ow = el.style.width; el.dataset.oh = el.style.height;
    el.style.left = "10px"; el.style.top = "38px";
    el.style.width = (window.innerWidth - 20) + "px";
    el.style.height = (window.innerHeight - 110) + "px";
    el.dataset.max = "1";
  }
}

function makeDraggable(el){
  const bar = el.querySelector(".titlebar");
  let sx, sy, ox, oy, drag = false;
  bar.addEventListener("mousedown", e => {
    if (e.target.closest(".light")) return;
    drag = true; sx = e.clientX; sy = e.clientY;
    ox = parseInt(el.style.left); oy = parseInt(el.style.top);
    e.preventDefault();
  });
  window.addEventListener("mousemove", e => {
    if (!drag) return;
    el.style.left = (ox + e.clientX - sx) + "px";
    el.style.top  = Math.max(30, oy + e.clientY - sy) + "px";
  });
  window.addEventListener("mouseup", () => drag = false);
}

/* ============ Dock magnification (desktop only) ============ */
const dock = document.getElementById("dock");
const items = [...dock.querySelectorAll(".dockitem")];

if (!isMobile) {
  dock.addEventListener("mousemove", e => {
    const mx = e.clientX;
    items.forEach(it => {
      const ir = it.getBoundingClientRect();
      const center = ir.left + ir.width / 2;
      const d = Math.abs(mx - center);
      const max = 110;
      const scale = d > max ? 1 : 1 + (1 - d/max) * 0.7;
      const lift  = d > max ? 0 : -(1 - d/max) * 10;
      it.style.transform = `scale(${scale}) translateY(${lift}px)`;
    });
  });
  dock.addEventListener("mouseleave", () => items.forEach(it => it.style.transform = ""));
}

/* ============ Wire up clicks ============ */
items.forEach(it => {
  const app = it.dataset.app;
  if (app) it.addEventListener("click", () => openApp(app));
});
document.querySelectorAll(".deskicon").forEach(d => {
  // mobile: single tap opens. desktop: dbl-click opens, single selects.
  if (isMobile) {
    d.addEventListener("click", () => openApp(d.dataset.app));
  } else {
    d.addEventListener("click", () => {
      document.querySelectorAll(".deskicon").forEach(x => x.classList.remove("sel"));
      d.classList.add("sel");
    });
    d.addEventListener("dblclick", () => openApp(d.dataset.app));
  }
});
document.getElementById("desktop").addEventListener("click", e => {
  if (e.target.id === "desktop")
    document.querySelectorAll(".deskicon").forEach(x => x.classList.remove("sel"));
});

/* ============ Clock ============ */
function tick(){
  const d = new Date();
  const opts = isMobile
    ? { hour:"2-digit", minute:"2-digit" }
    : { weekday:"short", day:"numeric", month:"short" };
  const date = isMobile ? "" : d.toLocaleDateString(undefined, opts) + " ";
  const time = d.toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });
  document.getElementById("clock").textContent = date + time;
}
tick(); setInterval(tick, 1000 * 30);

/* ============ Boot ============ */
setTimeout(() => {
  document.getElementById("boot").classList.add("gone");
  setTimeout(() => {
    openApp("about");
    if (!isMobile) setTimeout(() => openApp("projects"), 350);
  }, 500);
}, 1900);