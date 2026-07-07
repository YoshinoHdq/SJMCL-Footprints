(function () {
  var token = document.currentScript?.dataset?.extensionToken || "";
  if (!token) {
    throw new Error("Missing extension activation token");
  }

  function extensionFactory(api) {
    var React = api.React;
    var ChakraUI = api.ChakraUI;
    var Box = ChakraUI.Box;
    var VStack = ChakraUI.VStack;
    var HStack = ChakraUI.HStack;
    var Text = ChakraUI.Text;
    var Badge = ChakraUI.Badge;
    var Tag = ChakraUI.Tag;

    function fD(d){if(!d)return"?";return d.getFullYear()+"."+(d.getMonth()+1).toString().padStart(2,"0")+"."+d.getDate().toString().padStart(2,"0")}
    function dB(a,b){return Math.max(0,Math.round((new Date(b)-new Date(a))/86400000))}
    function dS(d){return d.getFullYear()+"-"+(d.getMonth()+1).toString().padStart(2,"0")+"-"+d.getDate().toString().padStart(2,"0")}
    function gI(){return Math.random().toString(36).slice(2,8)}

    // ===== 30+ 墓志铭语库 =====
    var EP=[
function(d){return"Born "+d.born+", died "+d.died+". Rested with "+d.modCount+" Mods. Every journey has an end."},
function(d){return"Here lies "+d.name+", who once explored the block world."},
function(d){return d.name+"'s story reached its final chapter. "+d.daysAlive+" days of adventure, eternal memories."},
function(d){return"A world called "+d.name+" once existed. That was enough."},
function(d){return"Bits never truly disappear. They just find a quieter way to be."},
function(d){return"Here rests "+d.name+" \u2014 deleted by the press of a key. F."},
function(d){return d.name+" survived "+d.daysAlive+" days. Cause: not enough disk space."},
function(d){return d.name+" deleted itself with "+d.modCount+" Mods. Reason: had enough fun."},
function(d){return"Not gone, just reborn on another disk partition. Amen."},
function(d){return d.name+" died on "+d.died+". Its "+d.modCount+" Mods cried too."},
function(d){return d.name+", born in spring, died in summer. "+d.daysAlive+" days together."},
function(d){return"Every deletion is a small funeral. "+d.name+", rest well."},
function(d){return d.name+"'s last Mod was uninstalled. The world fell silent."},
function(d){return"It came, it built, it was deleted. "+d.name+", not forgotten."},
function(d){return"Nothing lasts forever, not even "+d.name+". "+d.modCount+" Mods rest with it."},
function(d){return"Brave "+d.name+" fought "+d.daysAlive+" days on "+d.version+", resting with "+d.modCount+" artifacts."},
function(d){return"Here lies "+d.name+" \u2014 a mighty world that once had "+d.modCount+" Mods."},
function(d){return d.name+"'s adventure log: collected "+d.modCount+" treasures in "+d.daysAlive+" days."},
function(d){return"Legend says a world called "+d.name+" existed. It deserves to be remembered."},
function(d){return"Hero "+d.name+" sleeps here. "+d.version+" its mark, "+d.modCount+" its honor."},
function(d){return"Blocks stacked with time become ruins. "+d.name+" stands eternal in memory."},
function(d){return d.born+" to "+d.died+". "+d.name+"'s story flickered like redstone, then faded."},
function(d){return"Dust settles. "+d.name+" sinks into the sea of bits. "+d.daysAlive+" days of silence."},
function(d){return d.name+" \u2014 born in creation, died in deletion. But here, remembered."},
function(d){return"Stars fall, light remains. "+d.name+", your world will never be barren."},
function(d){return d.name+" sleeps here. "+d.version+", "+d.modCount+" Mods, "+d.daysAlive+" days."},
function(d){return"R.I.P. "+d.name+". "+d.born+" ~ "+d.died},
function(d){return d.name+" \u2014 not forgotten."},
function(d){return"Farewell, "+d.name+"."},
function(d){return d.name+" rests here. "+d.daysAlive+" days, beyond eternity."},
function(d){if(d.modCount>50)return d.name+" loaded "+d.modCount+" Mods and deleted itself.";return null},
function(d){if(d.daysAlive>365)return d.name+", "+d.daysAlive+" days of companionship. Thank you.";return null},
function(d){return"The epitaph reads: "+d.name+". "+d.modCount+" Mods forever by its side."},
];

    function pE(d){var v=[];for(var i=0;i<EP.length;i++){var t=EP[i](d);if(t)v.push(t)}return v.length?v[Math.floor(Math.random()*v.length)]:"R.I.P. "+d.name}
    function nT(n,v,m,ss){var nw=dS(new Date()),bd=ss||nw,al=ss?dB(ss,nw):0,dp={name:n,version:v||"?",modCount:m||0,born:fD(new Date(bd)),died:fD(new Date(nw)),daysAlive:al,id:n+"_"+nw+"_"+gI()};return dp}

    // ===== CSS 动效 =====
    (function(){var sid="tb-style";if(document.getElementById(sid))return;var s=document.createElement("style");s.id=sid;s.textContent=[
      "@keyframes tfI{from{opacity:0;transform:translateY(24px)scale(0.92)}to{opacity:1;transform:translateY(0)scale(1)}}",
      "@keyframes tfF{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}",
      "@keyframes tfG{0%,100%{box-shadow:0 0 12px rgba(160,150,140,0.15),0 4px 20px rgba(0,0,0,0.3)}50%{box-shadow:0 0 24px rgba(200,190,180,0.25),0 4px 28px rgba(0,0,0,0.35)}}",
      "@keyframes tfX{0%,100%{opacity:0.7}25%{opacity:1}50%{opacity:0.85}75%{opacity:0.95}}",
      "@keyframes tfP{0%{opacity:0.6;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}100%{opacity:0.6;transform:scale(1)}}",
      "@keyframes tfR{from{opacity:0;max-height:0}to{opacity:1;max-height:300px}}",
      ".tc{animation:tfI 0.6s ease-out,tfF 4s ease-in-out infinite!important;transition:all 0.3s ease!important;position:relative;overflow:hidden}",
      ".tc:hover{animation:tfG 2s ease-in-out infinite!important;transform:translateY(-6px)scale(1.02)!important}",
      ".tx{animation:tfX 3s ease-in-out infinite}",
      ".te{animation:tfP 3s ease-in-out infinite}",
      ".tr{animation:tfR 0.5s ease-out;overflow:hidden}",
    ].join("");document.head.appendChild(s)})();

    var PanelComponent = function TombstonePanel() {
      var host = api.getHostContext();
      var useExtensionState = host.state.useExtensionState;
      var kS = useExtensionState("k", {});
      var ki = kS[0]; var sK = kS[1];
      var tS = useExtensionState("t", []);
      var tb = tS[0]; var sT = tS[1];
      var eS = useExtensionState("e", {});
      var ep = eS[0]; var sE = eS[1];

      React.useEffect(function () {
        (async function () {
          try {
            var il = host.actions.getInstanceList(true) || [];
            var ci = {}; var cm = {};
            for (var i = 0; i < il.length; i++) {
              var inst = il[i]; var iid = inst.id || inst.name;
              ci[iid] = true; cm[iid] = { name: inst.name, version: inst.version, id: iid };
            }
            var nk = {}; var nt = [];
            var rki = {}; var rtb = [];
            try {
              var rd = JSON.parse(await host.actions.readFile("tb.json")) || {};
              rki = rd.k || {}; rtb = rd.tb || [];
            } catch (e) {}
            sT(rtb); sK(rki);
            for (var kid in rki) {
              if (!ci[kid]) { var mt = rki[kid]; nt.push(nT(mt.name, mt.version, mt.modCount || 0, mt.seenSince)); }
              else { nk[kid] = rki[kid]; }
            }
            for (var cid in cm) { if (!nk[cid]) { nk[cid] = { name: cm[cid].name, version: cm[cid].version, modCount: 0, seenSince: dS(new Date()) }; } }
            var finalTb = rtb.slice();
            if (nt.length > 0) {
              for (var n = 0; n < nt.length; n++) { finalTb.unshift(nt[n]); }
              if (finalTb.length > 50) { finalTb = finalTb.slice(0, 50); }
              sT(finalTb);
            }
            await host.actions.writeFile("tb.json", JSON.stringify({ tb: finalTb, k: nk }));
          } catch (e) {}
        })();
        var timer = setInterval(function () {
          (async function () {
            try {
              var il = host.actions.getInstanceList(true) || [];
              var ci = {}; var cm = {};
              for (var i = 0; i < il.length; i++) {
                var inst = il[i]; var iid = inst.id || inst.name;
                ci[iid] = true; cm[iid] = { name: inst.name, version: inst.version, id: iid };
              }
              var nk = {}; var nt = [];
              var rki = {}; var rtb = [];
              try {
                var rd = JSON.parse(await host.actions.readFile("tb.json")) || {};
                rki = rd.k || {}; rtb = rd.tb || [];
              } catch (e) {}
              sT(rtb); sK(rki);
              for (var kid in rki) {
                if (!ci[kid]) { var mt = rki[kid]; nt.push(nT(mt.name, mt.version, mt.modCount || 0, mt.seenSince)); }
                else { nk[kid] = rki[kid]; }
              }
              for (var cid in cm) { if (!nk[cid]) { nk[cid] = { name: cm[cid].name, version: cm[cid].version, modCount: 0, seenSince: dS(new Date()) }; } }
              var finalTb = rtb.slice();
              if (nt.length > 0) {
                for (var n = 0; n < nt.length; n++) { finalTb.unshift(nt[n]); }
                if (finalTb.length > 50) { finalTb = finalTb.slice(0, 50); }
                sT(finalTb);
              }
              await host.actions.writeFile("tb.json", JSON.stringify({ tb: finalTb, k: nk }));
            } catch (e) {}
          })();
        }, 3000);
        return function () { clearInterval(timer); };
      }, []);

      function toggleEpitaph(id) {
        var stone = null;
        for (var si = 0; si < stones.length; si++) { if (stones[si].id === id) { stone = stones[si]; break; } }
        var nx = {};
        for (var k in ep) { nx[k] = ep[k]; }
        if (!nx[id]) { nx[id] = { open: true, text: pE(stone) }; }
        else if (nx[id].open) { nx[id] = { open: false }; }
        else { nx[id] = { open: true, text: pE(stone) }; }
        sE(nx);
      }

      var stones = tb || [];
      var items = [];

      function makeCard(stone, idx) {
        var exp = ep[stone.id] || {};
        var delay = Math.min(idx * 0.06, 0.8);

        return React.createElement(Box, {
          key: stone.id, className: "tc", bg: "gray.800", borderRadius: "lg", border: "1px solid", borderColor: "gray.700", p: 2.5, cursor: "pointer", onClick: function () { toggleEpitaph(stone.id); },
          sx: { animationDelay: delay + "s", _hover: { borderColor: "gray.500" } }
        },
          React.createElement(HStack, { spacing: 2.5 },
            // 墓碑造型图标（拱形石头 + 十字架）
            React.createElement(Box, { w: 9, h: 12, borderRadius: "sm", bgGradient: "linear(to-b,gray.500,gray.700)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "md", flexShrink: 0, className: "tx", sx: { clipPath: "polygon(10% 0%, 90% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)" } },
              React.createElement(Text, { fontSize: "2xs", color: "gray.300", lineHeight: 1, mt: 0.5 }, "+"),
              React.createElement(Text, { fontSize: "2xs", color: "gray.300", lineHeight: 1 }, "\u26B7")
            ),
            // 实例信息
            React.createElement(VStack, { spacing: 0.5, align: "start", flex: 1, minW: 0 },
              React.createElement(Text, { fontSize: "sm", fontWeight: "bold", color: "gray.200", isTruncated: true }, stone.name),
              React.createElement(HStack, { spacing: 1.5, wrap: "wrap" },
                React.createElement(Tag, { size: "sm", colorScheme: "gray", variant: "subtle", fontSize: "2xs" }, stone.version),
                React.createElement(Tag, { size: "sm", colorScheme: "gray", variant: "subtle", fontSize: "2xs" }, stone.modCount + " Mod"),
                React.createElement(Tag, { size: "sm", colorScheme: "gray", variant: "subtle", fontSize: "2xs" }, stone.daysAlive + " \u5929")
              ),
              React.createElement(Text, { fontSize: "2xs", color: "gray.500" }, stone.born + " \u2013 " + stone.died)
            ),
            // 展开箭头
            React.createElement(Box, { color: "gray.600", fontSize: "xs", transform: exp.open ? "rotate(180deg)" : "rotate(0deg)", sx: { transition: "transform 0.3s" } }, "\u25BC")
          ),
          // 墓志铭展开
          exp.open ? React.createElement(Box, { mt: 2, pt: 2, borderTop: "1px solid", borderColor: "gray.700", className: "tr" },
            React.createElement(Text, { fontSize: "xs", color: "gray.300", fontStyle: "italic", lineHeight: 1.6, sx: { fontFamily: "'Georgia', serif" } }, "\u201C" + (exp.text || "") + "\u201D"),
            React.createElement(Text, { fontSize: "2xs", color: "gray.600", mt: 1, textAlign: "right" }, "\u2014 Epitaph \u2014")
          ) : null
        );
      }
      for (var si = 0; si < stones.length; si++) { items.push(makeCard(stones[si], si)); }

      return React.createElement(VStack, { align: "stretch", spacing: 3 },
        // 头部
        React.createElement(HStack, { justify: "space-between", align: "center" },
          React.createElement(HStack, { spacing: 2, align: "center" },
            React.createElement(Box, { w: 8, h: 8, bgGradient: "linear(to-br,gray.600,gray.700)", borderRadius: "md", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "md", className: "tx" }, "\uD83D\uDDE6"),
            React.createElement(VStack, { spacing: 0, align: "start" },
              React.createElement(Text, { fontWeight: "bold", fontSize: "sm", color: "gray.100", lineHeight: 1.2 }, "Once Upon"),
              React.createElement(Text, { fontSize: "xs", color: "gray.400" }, stones.length > 0 ? stones.length + "  stories" : "No stories")
            )
          )
        ),
        // 卡片列表或空状态
        stones.length > 0
          ? React.createElement(VStack, { spacing: 2 }, items)
          : React.createElement(Box, { className: "te", textAlign: "center", py: 6, color: "gray.500", fontSize: "xs" },
              React.createElement(Text, { fontSize: "4xl", mb: 2 }, "\uD83D\uDDE6"),
              React.createElement(Text, null, "No epitaphs yet\.\.\."),
              React.createElement(Text, null, "Delete an instance to leave a footprint.")
            )
      );
    };

    return {
      homeWidget: {
        title: "Once Upon",
        defaultWidth: 380,
        minWidth: 300,
        Component: PanelComponent,
      },
    };
  }

  window.registerExtension(extensionFactory, token);
})();