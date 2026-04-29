/* ============================================
   PAGE CANVASES — Unique interactive hero animations
   Each page gets a thematic, mouse-interactive canvas
   ============================================ */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var canvas = document.querySelector('.page-hero__canvas');
  if (!canvas || prefersReducedMotion) return;

  var ctx = canvas.getContext('2d');
  var animationId = null;
  var isVisible = true;
  var frameCount = 0;
  var mouse = { x: null, y: null };

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  var page = canvas.getAttribute('data-page');

  // ─── Shared: observer, mouse, resize ───

  var observer = new IntersectionObserver(function (entries) {
    isVisible = entries[0].isIntersecting;
    if (isVisible) {
      if (!animationId) animate();
    } else {
      animationId = null;
    }
  }, { threshold: 0 });

  observer.observe(canvas);

  canvas.parentElement.addEventListener('mousemove', function (e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.parentElement.addEventListener('mouseleave', function () {
    mouse.x = null;
    mouse.y = null;
  });

  // ─── Shared: mouse repulsion helper ───

  function repel(px, py, radius, strength) {
    if (mouse.x === null) return { x: px, y: py };
    var dx = px - mouse.x;
    var dy = py - mouse.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < radius && dist > 0) {
      var force = (radius - dist) / radius * strength;
      return { x: px + (dx / dist) * force, y: py + (dy / dist) * force };
    }
    return { x: px, y: py };
  }

  // ═══════════════════════════════════════════
  // ABOUT — DNA Double Helix
  // Mouse warps the helix strands apart locally
  // ═══════════════════════════════════════════

  var dna = {
    points: 40,
    amplitude: 0,
    spacing: 0,

    init: function () {
      var isMobile = window.innerWidth < 768;
      dna.points = isMobile ? 25 : 40;
      dna.amplitude = canvas.height * 0.18;
      dna.spacing = canvas.width / (dna.points - 1);
    },

    draw: function () {
      var cy = canvas.height / 2;
      var phase = frameCount * 0.04;

      for (var i = 0; i < dna.points; i++) {
        var x = i * dna.spacing;
        var angle = (i / dna.points) * Math.PI * 4 + phase;
        var y1 = cy + Math.sin(angle) * dna.amplitude;
        var y2 = cy + Math.sin(angle + Math.PI) * dna.amplitude;
        var depth1 = (Math.sin(angle) + 1) / 2;
        var depth2 = (Math.sin(angle + Math.PI) + 1) / 2;

        // Mouse repulsion on each node
        var p1 = repel(x, y1, 200, 35);
        var p2 = repel(x, y2, 200, 35);

        // Connecting rungs (every 3rd point)
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'rgba(27, 42, 74, 0.06)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Strand lines to next point
        if (i < dna.points - 1) {
          var nx = (i + 1) * dna.spacing;
          var nAngle = ((i + 1) / dna.points) * Math.PI * 4 + phase;
          var ny1 = cy + Math.sin(nAngle) * dna.amplitude;
          var ny2 = cy + Math.sin(nAngle + Math.PI) * dna.amplitude;
          var np1 = repel(nx, ny1, 200, 35);
          var np2 = repel(nx, ny2, 200, 35);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(np1.x, np1.y);
          ctx.strokeStyle = 'rgba(0, 155, 222, ' + (0.12 + depth1 * 0.12) + ')';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(p2.x, p2.y);
          ctx.lineTo(np2.x, np2.y);
          ctx.strokeStyle = 'rgba(196, 30, 58, ' + (0.12 + depth2 * 0.12) + ')';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Nodes
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 2 + depth1 * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 155, 222, ' + (0.25 + depth1 * 0.3) + ')';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p2.x, p2.y, 2 + depth2 * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(196, 30, 58, ' + (0.25 + depth2 * 0.3) + ')';
        ctx.fill();
      }
    }
  };

  // ═══════════════════════════════════════════
  // RESEARCH — Orbiting Clusters (5 pillar colors)
  // Mouse repels individual nodes within clusters
  // ═══════════════════════════════════════════

  var clusters = {
    groups: [],
    pillarColors: [
      { r: 37, g: 99, b: 235 },
      { r: 5, g: 150, b: 105 },
      { r: 217, g: 119, b: 6 },
      { r: 124, g: 58, b: 237 },
      { r: 220, g: 38, b: 38 }
    ],

    init: function () {
      clusters.groups = [];
      var isMobile = window.innerWidth < 768;
      var nodesPerCluster = isMobile ? 5 : 8;

      for (var g = 0; g < 5; g++) {
        var angle = (g / 5) * Math.PI * 2 - Math.PI / 2;
        var cx = canvas.width * 0.5 + Math.cos(angle) * canvas.width * 0.25;
        var cy = canvas.height * 0.5 + Math.sin(angle) * canvas.height * 0.28;
        var nodes = [];

        for (var n = 0; n < nodesPerCluster; n++) {
          nodes.push({
            angle: Math.random() * Math.PI * 2,
            radius: Math.random() * 30 + 10,
            speed: 0.003 + Math.random() * 0.004,
            size: 1.5 + Math.random() * 1.5
          });
        }

        clusters.groups.push({ cx: cx, cy: cy, nodes: nodes, color: clusters.pillarColors[g] });
      }
    },

    draw: function () {
      // Inter-cluster connections
      for (var i = 0; i < clusters.groups.length; i++) {
        var g1 = clusters.groups[i];
        var g2 = clusters.groups[(i + 1) % clusters.groups.length];
        ctx.beginPath();
        ctx.moveTo(g1.cx, g1.cy);
        ctx.lineTo(g2.cx, g2.cy);
        ctx.strokeStyle = 'rgba(27, 42, 74, 0.04)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      for (var g = 0; g < clusters.groups.length; g++) {
        var group = clusters.groups[g];
        var col = group.color;
        var positions = [];

        for (var n = 0; n < group.nodes.length; n++) {
          var node = group.nodes[n];
          node.angle += node.speed;
          var rawX = group.cx + Math.cos(node.angle) * node.radius;
          var rawY = group.cy + Math.sin(node.angle) * node.radius;
          var pos = repel(rawX, rawY, 100, 12);
          positions.push(pos);

          ctx.beginPath();
          ctx.arc(pos.x, pos.y, node.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(' + col.r + ',' + col.g + ',' + col.b + ', 0.4)';
          ctx.fill();
        }

        // Intra-cluster connections
        for (var a = 0; a < positions.length; a++) {
          for (var b = a + 1; b < positions.length; b++) {
            var dx = positions[a].x - positions[b].x;
            var dy = positions[a].y - positions[b].y;
            if (Math.sqrt(dx * dx + dy * dy) < 50) {
              ctx.beginPath();
              ctx.moveTo(positions[a].x, positions[a].y);
              ctx.lineTo(positions[b].x, positions[b].y);
              ctx.strokeStyle = 'rgba(' + col.r + ',' + col.g + ',' + col.b + ', 0.12)';
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }
    }
  };

  // ═══════════════════════════════════════════
  // PEOPLE — Constellation
  // Mouse repels dots + draws connection lines to nearby cursor
  // ═══════════════════════════════════════════

  var constellation = {
    dots: [],

    init: function () {
      constellation.dots = [];
      var isMobile = window.innerWidth < 768;
      var count = isMobile ? 30 : 55;

      for (var i = 0; i < count; i++) {
        constellation.dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: 1.5 + Math.random() * 2,
          phase: Math.random() * Math.PI * 2
        });
      }
    },

    draw: function () {
      var dots = constellation.dots;

      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;

        // Mouse repulsion
        if (mouse.x !== null) {
          var mdx = d.x - mouse.x;
          var mdy = d.y - mouse.y;
          var mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 130) {
            var force = (130 - mdist) / 130 * 0.008;
            d.vx += mdx * force;
            d.vy += mdy * force;
          }
        }

        // Speed dampening
        var speed = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        if (speed > 0.6) { d.vx *= 0.98; d.vy *= 0.98; }

        var pulse = 0.35 + Math.sin(frameCount * 0.02 + d.phase) * 0.15;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(27, 42, 74, ' + pulse + ')';
        ctx.fill();

        // Connect to nearby dots
        for (var j = i + 1; j < dots.length; j++) {
          var dx = d.x - dots[j].x;
          var dy = d.y - dots[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = 'rgba(0, 155, 222, ' + ((1 - dist / 120) * 0.12) + ')';
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Mouse attraction lines — connect dots near cursor
        if (mouse.x !== null) {
          var mDist = Math.sqrt((d.x - mouse.x) * (d.x - mouse.x) + (d.y - mouse.y) * (d.y - mouse.y));
          if (mDist < 150) {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = 'rgba(0, 155, 222, ' + ((1 - mDist / 150) * 0.15) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }
  };

  // ═══════════════════════════════════════════
  // PUBLICATIONS — Rising Particles
  // Mouse repels particles as they float upward
  // ═══════════════════════════════════════════

  var rising = {
    particles: [],

    init: function () {
      rising.particles = [];
      var isMobile = window.innerWidth < 768;
      var count = isMobile ? 25 : 45;
      for (var i = 0; i < count; i++) {
        rising.particles.push(rising.createParticle());
      }
    },

    createParticle: function () {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0,
        vy: 0,
        baseSpeed: 0.15 + Math.random() * 0.3,
        radius: 1.2 + Math.random() * 2,
        opacity: 0.2 + Math.random() * 0.3,
        drift: (Math.random() - 0.5) * 0.3
      };
    },

    draw: function () {
      var p = rising.particles;

      for (var i = 0; i < p.length; i++) {
        var pt = p[i];
        pt.y -= pt.baseSpeed;
        pt.x += pt.drift;

        // Mouse repulsion
        if (mouse.x !== null) {
          var dx = pt.x - mouse.x;
          var dy = pt.y - mouse.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 0) {
            var force = (120 - dist) / 120 * 1.5;
            pt.x += (dx / dist) * force;
            pt.y += (dy / dist) * force;
          }
        }

        if (pt.y < -10) {
          pt.y = canvas.height + 10;
          pt.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(27, 42, 74, ' + pt.opacity + ')';
        ctx.fill();

        // Citation links
        for (var j = i + 1; j < p.length; j++) {
          var dyy = Math.abs(pt.y - p[j].y);
          var dxx = Math.abs(pt.x - p[j].x);
          if (dyy < 8 && dxx < 150 && dxx > 20) {
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(p[j].x, p[j].y);
            ctx.strokeStyle = 'rgba(0, 155, 222, 0.08)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }
  };

  // ═══════════════════════════════════════════
  // MAKERSPACE — Circuit Board Traces
  // Mouse proximity makes nearby nodes glow + attracts pulse spawns
  // ═══════════════════════════════════════════

  var circuit = {
    nodes: [],
    traces: [],
    pulses: [],
    cols: 0,

    init: function () {
      circuit.nodes = [];
      circuit.traces = [];
      circuit.pulses = [];
      var isMobile = window.innerWidth < 768;
      circuit.cols = isMobile ? 6 : 10;
      var rows = isMobile ? 4 : 6;
      var spacingX = canvas.width / (circuit.cols + 1);
      var spacingY = canvas.height / (rows + 1);

      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < circuit.cols; c++) {
          var jx = (Math.random() - 0.5) * spacingX * 0.3;
          var jy = (Math.random() - 0.5) * spacingY * 0.3;
          circuit.nodes.push({
            x: spacingX * (c + 1) + jx,
            y: spacingY * (r + 1) + jy,
            baseX: spacingX * (c + 1) + jx,
            baseY: spacingY * (r + 1) + jy,
            row: r, col: c,
            glow: 0
          });
        }
      }

      for (var i = 0; i < circuit.nodes.length; i++) {
        var nd = circuit.nodes[i];
        if (nd.col < circuit.cols - 1 && Math.random() > 0.3) {
          circuit.traces.push({ from: i, to: i + 1 });
        }
        if (nd.row < rows - 1 && Math.random() > 0.3) {
          circuit.traces.push({ from: i, to: i + circuit.cols });
        }
      }
    },

    draw: function () {
      if (frameCount % 120 === 0 && circuit.traces.length > 0) {
        var ti = Math.floor(Math.random() * circuit.traces.length);
        circuit.pulses.push({ trace: ti, progress: 0, speed: 0.015 + Math.random() * 0.01 });
      }

      // Mouse proximity glow + displacement on nodes
      for (var n = 0; n < circuit.nodes.length; n++) {
        var nd = circuit.nodes[n];
        nd.x = nd.baseX;
        nd.y = nd.baseY;

        if (mouse.x !== null) {
          var dx = nd.baseX - mouse.x;
          var dy = nd.baseY - mouse.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            nd.glow = Math.max(nd.glow, (100 - dist) / 100);
            var force = (100 - dist) / 100 * 5;
            nd.x += (dx / dist) * force;
            nd.y += (dy / dist) * force;
          }
        }
      }

      // Draw traces
      for (var t = 0; t < circuit.traces.length; t++) {
        var tr = circuit.traces[t];
        var from = circuit.nodes[tr.from];
        var to = circuit.nodes[tr.to];
        var midX = to.x;
        var midY = from.y;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(midX, midY);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = 'rgba(27, 42, 74, 0.08)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Draw pulses
      for (var p = circuit.pulses.length - 1; p >= 0; p--) {
        var pulse = circuit.pulses[p];
        pulse.progress += pulse.speed;

        var ptr = circuit.traces[pulse.trace];
        var pfrom = circuit.nodes[ptr.from];
        var pto = circuit.nodes[ptr.to];
        var pmidX = pto.x;
        var pmidY = pfrom.y;
        var px, py;

        if (pulse.progress < 0.5) {
          var pt = pulse.progress * 2;
          px = pfrom.x + (pmidX - pfrom.x) * pt;
          py = pfrom.y;
        } else {
          var pt2 = (pulse.progress - 0.5) * 2;
          px = pmidX;
          py = pmidY + (pto.y - pmidY) * pt2;
        }

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(220, 38, 38, 0.5)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(220, 38, 38, 0.1)';
        ctx.fill();

        if (pulse.progress >= 1) {
          circuit.nodes[ptr.to].glow = 1;
          circuit.pulses.splice(p, 1);
        }
      }

      // Draw nodes
      for (var ni = 0; ni < circuit.nodes.length; ni++) {
        var cnd = circuit.nodes[ni];
        if (cnd.glow > 0) {
          cnd.glow *= 0.94;
          if (cnd.glow < 0.01) cnd.glow = 0;
        }
        var r = 2 + cnd.glow * 4;
        ctx.beginPath();
        ctx.arc(cnd.x, cnd.y, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(220, 38, 38, ' + (0.2 + cnd.glow * 0.6) + ')';
        ctx.fill();
      }
    }
  };

  // ═══════════════════════════════════════════
  // NEWS — Flowing Stream
  // Mouse deflects particles in the stream
  // ═══════════════════════════════════════════

  var stream = {
    particles: [],

    init: function () {
      stream.particles = [];
      var isMobile = window.innerWidth < 768;
      var count = isMobile ? 30 : 60;
      for (var i = 0; i < count; i++) {
        stream.particles.push(stream.createParticle());
      }
    },

    createParticle: function () {
      var lane = Math.floor(Math.random() * 5);
      var laneY = (canvas.height / 6) * (lane + 1);
      return {
        x: Math.random() * canvas.width,
        y: laneY + (Math.random() - 0.5) * 30,
        baseY: laneY,
        speed: 0.3 + Math.random() * 0.6,
        radius: 1 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.2 + Math.random() * 0.25,
        yOffset: 0
      };
    },

    draw: function () {
      var p = stream.particles;

      for (var i = 0; i < p.length; i++) {
        var pt = p[i];
        pt.x += pt.speed;
        var waveY = pt.baseY + Math.sin(frameCount * 0.012 + pt.phase) * 15;

        // Mouse deflection
        pt.yOffset *= 0.92;
        if (mouse.x !== null) {
          var dx = pt.x - mouse.x;
          var dy = waveY - mouse.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100 && dist > 0) {
            pt.yOffset += (dy / dist) * ((100 - dist) / 100) * 3;
          }
        }

        pt.y = waveY + pt.yOffset;

        if (pt.x > canvas.width + 10) pt.x = -10;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(27, 42, 74, ' + pt.opacity + ')';
        ctx.fill();

        // Trailing line
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.lineTo(pt.x - pt.speed * 14, pt.y);
        ctx.strokeStyle = 'rgba(0, 155, 222, ' + (pt.opacity * 0.35) + ')';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  };

  // ═══════════════════════════════════════════
  // IMPACT — Expanding Ripples
  // Mouse position spawns ripples on hover
  // ═══════════════════════════════════════════

  var ripples = {
    rings: [],
    lastMouseSpawn: 0,

    init: function () {
      ripples.rings = [];
    },

    draw: function () {
      // Auto-spawn every ~100 frames
      if (frameCount % 100 === 0 || ripples.rings.length === 0) {
        ripples.rings.push(ripples.createRing(
          Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
          Math.random() * canvas.height * 0.8 + canvas.height * 0.1
        ));
      }

      // Mouse-spawned ripples (throttled)
      if (mouse.x !== null && frameCount - ripples.lastMouseSpawn > 40) {
        ripples.rings.push(ripples.createRing(mouse.x, mouse.y));
        ripples.lastMouseSpawn = frameCount;
      }

      for (var i = ripples.rings.length - 1; i >= 0; i--) {
        var ring = ripples.rings[i];
        ring.radius += ring.speed;
        ring.opacity = 0.25 * (1 - ring.radius / ring.maxRadius);

        if (ring.opacity <= 0) {
          ripples.rings.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(' + ring.color + ', ' + ring.opacity + ')';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        if (ring.radius > 20) {
          ctx.beginPath();
          ctx.arc(ring.x, ring.y, ring.radius - 20, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(' + ring.color + ', ' + (ring.opacity * 0.4) + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    },

    createRing: function (x, y) {
      return {
        x: x, y: y,
        radius: 0,
        maxRadius: 80 + Math.random() * 60,
        speed: 0.4 + Math.random() * 0.3,
        opacity: 0.25,
        color: Math.random() > 0.5 ? '0, 155, 222' : '196, 30, 58'
      };
    }
  };

  // ═══════════════════════════════════════════
  // CONTACT — Signal Waves
  // Mouse distorts wave amplitude locally
  // ═══════════════════════════════════════════

  var waves = {
    configs: [],

    init: function () {
      waves.configs = [
        { freq: 0.008, amp: 25, speed: 0.02, yOff: 0.3, color: '0, 155, 222', opacity: 0.15 },
        { freq: 0.012, amp: 18, speed: 0.025, yOff: 0.45, color: '27, 42, 74', opacity: 0.12 },
        { freq: 0.006, amp: 30, speed: 0.015, yOff: 0.6, color: '196, 30, 58', opacity: 0.1 },
        { freq: 0.01, amp: 22, speed: 0.03, yOff: 0.75, color: '0, 155, 222', opacity: 0.08 }
      ];
    },

    draw: function () {
      for (var w = 0; w < waves.configs.length; w++) {
        var cfg = waves.configs[w];
        var baseY = canvas.height * cfg.yOff;
        var phase = frameCount * cfg.speed;

        ctx.beginPath();
        var firstY = baseY + Math.sin(phase) * cfg.amp;
        ctx.moveTo(0, firstY);

        for (var x = 1; x <= canvas.width; x += 3) {
          var y = baseY + Math.sin(x * cfg.freq + phase) * cfg.amp;

          // Mouse amplitude distortion
          if (mouse.x !== null) {
            var dxm = Math.abs(x - mouse.x);
            if (dxm < 150) {
              var influence = (150 - dxm) / 150;
              var dym = mouse.y - baseY;
              y += dym * influence * 0.3;
            }
          }

          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = 'rgba(' + cfg.color + ', ' + cfg.opacity + ')';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Dots at intervals
        for (var px = 0; px < canvas.width; px += 60) {
          var py = baseY + Math.sin(px * cfg.freq + phase) * cfg.amp;
          if (mouse.x !== null) {
            var dxd = Math.abs(px - mouse.x);
            if (dxd < 150) {
              py += (mouse.y - baseY) * ((150 - dxd) / 150) * 0.3;
            }
          }
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(' + cfg.color + ', ' + (cfg.opacity * 2.5) + ')';
          ctx.fill();
        }
      }
    }
  };

  // ═══════════════════════════════════════════
  // DISPATCH
  // ═══════════════════════════════════════════

  var animations = {
    about: dna,
    research: clusters,
    people: constellation,
    publications: rising,
    makerspace: circuit,
    news: stream,
    impact: ripples,
    contact: waves
  };

  var currentAnim = animations[page];
  if (!currentAnim) return;

  function init() {
    resize();
    currentAnim.init();
  }

  function animate() {
    if (!isVisible) return;
    frameCount++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentAnim.draw();
    animationId = requestAnimationFrame(animate);
  }

  init();
  animate();

  window.addEventListener('resize', function () {
    resize();
    currentAnim.init();
  });

})();
