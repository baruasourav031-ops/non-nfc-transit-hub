/* =========================================================
   Klang Valley Rapid KL rail network + fare estimator
   Lines: LRT Ampang, LRT Sri Petaling, LRT Kelana Jaya,
          MRT Kajang, MRT Putrajaya, KL Monorail
   Fares are ESTIMATES from a distance-based model
   (cashless card fare). Official fares may differ slightly.
   ========================================================= */
(function (global) {
    "use strict";

    const LINES = [
        {
            code: "AG", name: "LRT Ampang Line", short: "Ampang", color: "#e57200", spans: [["Chan Sow Lin", 10.6], ["Ampang", 8.0]],
            stations: ["Sentul Timur", "Sentul", "Titiwangsa", "PWTC", "Sultan Ismail", "Bandaraya", "Masjid Jamek",
                "Plaza Rakyat", "Hang Tuah", "Pudu", "Chan Sow Lin", "Miharja", "Maluri", "Pandan Jaya",
                "Pandan Indah", "Cempaka", "Cahaya", "Ampang"]
        },
        {
            code: "SP", name: "LRT Sri Petaling Line", short: "Sri Petaling", color: "#76232f", spans: [["Chan Sow Lin", 10.6], ["Sri Petaling", 9.2], ["Putra Heights", 17.7]],
            stations: ["Sentul Timur", "Sentul", "Titiwangsa", "PWTC", "Sultan Ismail", "Bandaraya", "Masjid Jamek",
                "Plaza Rakyat", "Hang Tuah", "Pudu", "Chan Sow Lin", "Cheras", "Salak Selatan", "Bandar Tun Razak",
                "Bandar Tasik Selatan", "Sungai Besi", "Bukit Jalil", "Sri Petaling", "Awan Besar", "Muhibbah",
                "Alam Sutera", "Kinrara BK5", "IOI Puchong Jaya", "Pusat Bandar Puchong", "Taman Perindustrian Puchong",
                "Bandar Puteri", "Puchong Perdana", "Puchong Prima", "Putra Heights"]
        },
        {
            code: "KJ", name: "LRT Kelana Jaya Line", short: "Kelana Jaya", color: "#d50032", km: 46.4,
            stations: ["Gombak", "Taman Melati", "Wangsa Maju", "Sri Rampai", "Setiawangsa", "Jelatek", "Dato' Keramat",
                "Damai", "Ampang Park", "KLCC", "Kampung Baru", "Dang Wangi", "Masjid Jamek", "Pasar Seni", "KL Sentral",
                "Bangsar", "Abdullah Hukum", "Kerinchi", "Universiti", "Taman Jaya", "Asia Jaya", "Taman Paramount",
                "Taman Bahagia", "Kelana Jaya", "Lembah Subang", "Ara Damansara", "Glenmarie", "Subang Jaya", "SS 15",
                "SS 18", "USJ 7", "Taipan", "Wawasan", "USJ 21", "Alam Megah", "Subang Alam", "Putra Heights"]
        },
        {
            code: "KG", name: "MRT Kajang Line", short: "Kajang", color: "#047940", km: 46.0,
            stations: ["Kwasa Damansara", "Kota Damansara", "Surian", "Mutiara Damansara", "Bandar Utama", "TTDI",
                "Phileo Damansara", "Pusat Bandar Damansara", "Semantan", "Muzium Negara", "Pasar Seni", "Merdeka",
                "Bukit Bintang", "Tun Razak Exchange (TRX)", "Cochrane", "Maluri", "Taman Pertama", "Taman Midah",
                "Taman Mutiara", "Taman Connaught", "Taman Suntex", "Sri Raya", "Bandar Tun Hussein Onn",
                "Batu 11 Cheras", "Bukit Dukung", "Sungai Jernih", "Stadium Kajang", "Kajang"]
        },
        {
            code: "PY", name: "MRT Putrajaya Line", short: "Putrajaya", color: "#e3a700", km: 57.7,
            stations: ["Kwasa Damansara", "Kampung Selamat", "Sungai Buloh", "Damansara Damai", "Sri Damansara Barat",
                "Sri Damansara Sentral", "Sri Damansara Timur", "Metro Prima", "Kepong Baru", "Jinjang", "Sri Delima",
                "Kampung Batu", "Kentonmen", "Jalan Ipoh", "Sentul Barat", "Titiwangsa", "Hospital Kuala Lumpur",
                "Raja Uda", "Ampang Park", "Persiaran KLCC", "Conlay", "Tun Razak Exchange (TRX)", "Chan Sow Lin",
                "Kuchai", "Taman Naga Emas", "Sungai Besi", "Serdang Raya Utara", "Serdang Raya Selatan", "Serdang Jaya",
                "UPM", "Taman Equine", "Putra Permai", "16 Sierra", "Cyberjaya Utara", "Cyberjaya City Centre",
                "Putrajaya Sentral"]
        },
        {
            code: "MR", name: "KL Monorail", short: "Monorail", color: "#7ab800", km: 8.6,
            stations: ["KL Sentral", "Tun Sambanthan", "Maharajalela", "Hang Tuah", "Imbi", "Bukit Bintang",
                "Raja Chulan", "Bukit Nanas", "Medan Tuanku", "Chow Kit", "Titiwangsa"]
        }
    ];

    // Fare model (cashless, RM): flag fall + per-km, rounded to 10 sen, clamped.
    const FARE = { base: 0.70, perKm: 0.10, min: 1.00, max: 6.50, concession: 0.5, transferMin: 4, minPerStop: 2.2 };

    // ---- Build graph ----
    const graph = new Map();       // station -> [{to, km, line}]
    const stationLines = new Map(); // station -> Set(lineCode)
    const lineByCode = {};

    function addEdge(a, b, km, line) {
        if (!graph.has(a)) graph.set(a, []);
        graph.get(a).push({ to: b, km, line });
    }

    LINES.forEach(l => {
        lineByCode[l.code] = l;
        // segment length per station gap: from spans (km up to a station) or evenly over the line length
        const segs = [];
        const spans = l.spans || [[l.stations[l.stations.length - 1], l.km]];
        let startIdx = 0;
        spans.forEach(([upto, km]) => {
            const end = l.stations.indexOf(upto);
            for (let i = startIdx; i < end; i++) segs[i] = km / (end - startIdx);
            startIdx = end;
        });
        l.km = segs.reduce((a, b) => a + b, 0);
        l.stations.forEach((s, i) => {
            if (!stationLines.has(s)) stationLines.set(s, new Set());
            stationLines.get(s).add(l.code);
            if (i > 0) {
                const p = l.stations[i - 1];
                addEdge(p, s, segs[i - 1], l.code);
                addEdge(s, p, segs[i - 1], l.code);
            }
        });
    });

    const ALL_STATIONS = [...stationLines.keys()].sort((a, b) => a.localeCompare(b));

    // Dijkstra over (station, line) states so line changes can be penalised.
    function route(from, to) {
        if (!graph.has(from) || !graph.has(to)) return null;
        if (from === to) return { stations: [from], legs: [], km: 0, stops: 0, transfers: 0 };

        const PEN = 3; // km-equivalent penalty per line change (prefers fewer transfers)
        const key = (s, l) => s + "|" + l;
        const dist = new Map(), prev = new Map(), done = new Set();
        const pq = [];
        const push = (d, s, l, km) => { pq.push({ d, s, l, km }); };

        push(0, from, "", 0); dist.set(key(from, ""), 0);
        while (pq.length) {
            let bi = 0;
            for (let i = 1; i < pq.length; i++) if (pq[i].d < pq[bi].d) bi = i;
            const cur = pq.splice(bi, 1)[0];
            const ck = key(cur.s, cur.l);
            if (done.has(ck)) continue;
            done.add(ck);
            if (cur.s === to) {
                // rebuild
                const steps = [];
                let k = ck;
                while (prev.has(k)) { const p = prev.get(k); steps.unshift(p.edge); k = p.from; }
                return buildResult(from, steps, cur.km);
            }
            for (const e of graph.get(cur.s)) {
                const change = cur.l && cur.l !== e.line ? PEN : 0;
                const nd = cur.d + e.km + change;
                const nk = key(e.to, e.line);
                if (nd < (dist.has(nk) ? dist.get(nk) : Infinity)) {
                    dist.set(nk, nd);
                    prev.set(nk, { from: ck, edge: { from: cur.s, to: e.to, km: e.km, line: e.line } });
                    push(nd, e.to, e.line, cur.km + e.km);
                }
            }
        }
        return null;
    }

    function buildResult(from, steps, km) {
        const legs = [];
        steps.forEach(st => {
            const last = legs[legs.length - 1];
            if (last && last.line === st.line) { last.to = st.to; last.stops++; last.km += st.km; last.via.push(st.to); }
            else legs.push({ line: st.line, from: st.from, to: st.to, stops: 1, km: st.km, via: [st.to] });
        });
        return {
            stations: [from].concat(steps.map(s => s.to)),
            legs,
            km: Math.round(km * 10) / 10,
            stops: steps.length,
            transfers: Math.max(0, legs.length - 1)
        };
    }

    const r10 = n => Math.round(n * 10) / 10;

    function fareForKm(km) {
        if (km <= 0) return 0;
        return Math.min(FARE.max, Math.max(FARE.min, r10(FARE.base + FARE.perKm * km)));
    }

    function isConcession(category) {
        return /student|oku|senior/i.test(String(category || ""));
    }

    function quote(from, to, category) {
        const r = route(from, to);
        if (!r) return null;
        const standard = from === to ? FARE.min : fareForKm(r.km);
        const conc = isConcession(category);
        const final = conc ? r10(standard * FARE.concession) : standard;
        const minutes = Math.round(r.stops * FARE.minPerStop + r.transfers * FARE.transferMin);
        return Object.assign(r, {
            standardFare: standard,
            concessionFare: r10(standard * FARE.concession),
            finalFare: final,
            concession: conc,
            minutes
        });
    }

    function optionsHtml(selected) {
        const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
        return LINES.map(l => `<optgroup label="${esc(l.name)}">` +
            l.stations.map(s => `<option value="${esc(s)}"${s === selected ? " selected" : ""}>${esc(s)}</option>`).join("") +
            `</optgroup>`).join("");
    }

    global.Fares = { LINES, ALL_STATIONS, FARE, lineByCode, stationLines, route, quote, fareForKm, isConcession, optionsHtml };
})(window);