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
      // 哲理型
      function(d){return"生于 "+d.born+"，卒于 "+d.died+"。携 "+d.modCount+" 个 Mod 安息。每一段旅程都有终点。"},
      function(d){return"此地长眠着一位探索者"+d.name+"，曾在方块世界中留下自己的足迹。"},
      function(d){return d.name+"的故事写到了最后一章。"+d.daysAlive+"天的冒险，化作永恒的回忆。"},
      function(d){return"天地之间，曾有一个世界叫"+d.name+"。它存在过，这就够了。"},
      function(d){return"比特不曾真正消失，它们只是换了一种方式安静。"},
      // 幽默型
      function(d){return"此处安葬着「"+d.name+"」——被删除键一键超度的可怜实例。"},
      function(d){return"「"+d.name+"」存活"+d.daysAlive+"天，死于「磁盘空间不足」的借口。"},
      function(d){return d.name+"，卒于"+d.died+"。它没有哭，但它的"+d.modCount+"个 Mod 都哭了。"},
      function(d){return"不是消失了，只是转生到另一个磁盘分区去了。安。"},
      function(d){return"勇者"+d.name+"带着"+d.modCount+"个 Mod 删除了自己。理由是：玩够了。"},
      // 伤感型
      function(d){return d.name+"，生于春花烂漫时，卒于夏日蝉鸣中。"+d.daysAlive+"天的陪伴，不说再见。"},
      function(d){return"每一次删除都是一场小小的葬礼。"+d.name+"，走好。"},
      function(d){return"「"+d.name+"」的最后一个 Mod 被卸载时，世界安静了下来。"},
      function(d){return"它来过，它建过，它被删除了。"+d.name+"，未被遗忘。"},
      function(d){return"没有什么是永垂不朽的，连"+d.name+"也是。"+d.modCount+"个 Mod 随它一同长眠。"},
      // 史诗型
      function(d){return"勇者"+d.name+"，在 "+d.version+" 的战场上奋战了 "+d.daysAlive+" 个日夜，带着 "+d.modCount+" 件装备沉眠于此。"},
      function(d){return"此处封印着"+d.name+"——一个曾经拥有"+d.modCount+"个 Mod 的强大世界。"},
      function(d){return d.name+"的冒险日志最后一页：『我在"+d.daysAlive+"天的旅途中收集了"+d.modCount+"件宝藏。』"},
      function(d){return"传说，有一个叫做"+d.name+"的世界……它值得被记住。"},
      function(d){return"英雄"+d.name+"在此长眠。"+d.version+"是其时代的烙印，"+d.modCount+"是其征战的勋章。"},
      // 诗意型
      function(d){return"方块堆砌的时光终成废墟，"+d.name+"在记忆里永远矗立。"},
      function(d){return d.born+" 至 "+d.died+"，"+d.name+"的故事如同红石信号般闪烁过，然后熄灭。"},
      function(d){return"尘埃落定，"+d.name+"沉入比特之海。"+d.daysAlive+"日的喧嚣归于沉寂。"},
      function(d){return d.name+"——生于创造，死于遗忘。但在这里，你被记得。"},
      function(d){return"星辰陨落，仍有光芒。"+d.name+"，你的世界不会荒芜。"},
      // 简短型
      function(d){return d.name+"在此长眠。"+d.version+"，"+d.modCount+"个 Mod，"+d.daysAlive+"天。"},
      function(d){return"R.I.P. "+d.name+"。"+d.born+" ~ "+d.died},
      function(d){return d.name+"——未被遗忘。"},
      function(d){return"再见，"+d.name+"。"},
      function(d){return"「"+d.name+"」长眠于此。"+d.daysAlive+"天，胜过永恒。"},
      // 条件触发
      function(d){if(d.modCount>50)return d.name+"装了"+d.modCount+"个 Mod，最后把自己装没了。";return null},
      function(d){if(d.daysAlive>365)return d.name+"陪伴了你整整一年有余。"+d.daysAlive+"天，感谢有你。";return null},
      function(d){return"墓碑上刻着："+d.name+"。"+d.modCount+" 个 Mod 永远陪在它身边。"},
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
            React.createElement(Text, { fontSize: "2xs", color: "gray.600", mt: 1, textAlign: "right" }, "\u2014 曾几何时 \u2014")
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
              React.createElement(Text, { fontWeight: "bold", fontSize: "sm", color: "gray.100", lineHeight: 1.2 }, "曾几何时"),
              React.createElement(Text, { fontSize: "xs", color: "gray.400" }, stones.length > 0 ? stones.length + "  篇故事" : "暂无故事")
            )
          )
        ),
        // 卡片列表或空状态
        stones.length > 0
          ? React.createElement(VStack, { spacing: 2 }, items)
          : React.createElement(Box, { className: "te", textAlign: "center", py: 6, color: "gray.500", fontSize: "xs" },
              React.createElement(Text, { fontSize: "4xl", mb: 2 }, "\uD83D\uDDE6"),
              React.createElement(Text, null, "尚无碑文"),
              React.createElement(Text, null, "删除一个实例，留下一段足迹。")
            )
      );
    };

    return {
      homeWidget: {
        title: "曾几何时",
        defaultWidth: 380,
        minWidth: 300,
        Component: PanelComponent,
      },
    };
  }

  window.registerExtension(extensionFactory, token);
})();