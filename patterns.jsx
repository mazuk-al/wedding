// SVG pattern renderers — distinctive cultural motifs.
// Draws motifs DIRECTLY in a grid (no <pattern> element) so it renders
// reliably under any screenshot/print engine.

const Patterns = (() => {

  // utility: build NxM grid of {x,y,index}
  function grid(w, h, tile) {
    const cols = Math.ceil(w / tile) + 1;
    const rows = Math.ceil(h / tile) + 1;
    const cells = [];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        cells.push({ x: c * tile, y: r * tile, c, r });
    return cells;
  }

  // ===== KAZAKH motif (single tile, drawn around 0,0..tile,tile) =====
  function KzMotif({ s, color, accent }) {
    const c = s / 2;
    return (
      <g>
        {/* Central SHANYRAK (yurt crown) */}
        <g fill="none" stroke={color} strokeWidth={s*0.012} strokeLinecap="round">
          <circle cx={c} cy={c} r={s*0.22}/>
          <circle cx={c} cy={c} r={s*0.14}/>
          <circle cx={c} cy={c} r={s*0.05}/>
          {/* spokes */}
          {Array.from({length:12}).map((_,i)=>{
            const a = (i*Math.PI)/6;
            const x1 = c + Math.cos(a)*s*0.05;
            const y1 = c + Math.sin(a)*s*0.05;
            const x2 = c + Math.cos(a)*s*0.22;
            const y2 = c + Math.sin(a)*s*0.22;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}/>;
          })}
        </g>
        <circle cx={c} cy={c} r={s*0.022} fill={color}/>

        {/* ram-horn pairs at four corners (qoshqar muyiz) */}
        {[
          {tx:0, ty:0, rot:0},
          {tx:s, ty:0, rot:90},
          {tx:s, ty:s, rot:180},
          {tx:0, ty:s, rot:270},
        ].map((g, i) => (
          <g key={i} transform={`translate(${g.tx} ${g.ty}) rotate(${g.rot})`} fill="none" stroke={color} strokeWidth={s*0.011} strokeLinecap="round">
            {/* two scrolls meeting at corner */}
            <path d={`M ${s*0.05} ${s*0.05}
                      C ${s*0.20} ${s*0.05} ${s*0.32} ${s*0.18} ${s*0.30} ${s*0.32}
                      C ${s*0.28} ${s*0.44} ${s*0.16} ${s*0.46} ${s*0.10} ${s*0.40}
                      C ${s*0.06} ${s*0.34} ${s*0.14} ${s*0.30} ${s*0.18} ${s*0.32}
                      C ${s*0.21} ${s*0.33} ${s*0.20} ${s*0.38} ${s*0.17} ${s*0.38}`}/>
            <path d={`M ${s*0.05} ${s*0.05}
                      C ${s*0.05} ${s*0.20} ${s*0.18} ${s*0.32} ${s*0.32} ${s*0.30}
                      C ${s*0.44} ${s*0.28} ${s*0.46} ${s*0.16} ${s*0.40} ${s*0.10}
                      C ${s*0.34} ${s*0.06} ${s*0.30} ${s*0.14} ${s*0.32} ${s*0.18}
                      C ${s*0.33} ${s*0.21} ${s*0.38} ${s*0.20} ${s*0.38} ${s*0.17}`}/>
          </g>
        ))}

        {/* small diamonds at edge midpoints (accent fill) */}
        {[[c,0],[c,s],[0,c],[s,c]].map(([x,y],i)=>(
          <g key={i}>
            <path d={`M ${x} ${y-s*0.025} L ${x+s*0.025} ${y} L ${x} ${y+s*0.025} L ${x-s*0.025} ${y} Z`} fill={accent}/>
            <path d={`M ${x} ${y-s*0.012} L ${x+s*0.012} ${y} L ${x} ${y+s*0.012} L ${x-s*0.012} ${y} Z`} fill={color}/>
          </g>
        ))}

        {/* diagonal mini-rhombs */}
        {[
          [c+Math.cos(Math.PI/4)*s*0.32, c+Math.sin(Math.PI/4)*s*0.32],
          [c+Math.cos(3*Math.PI/4)*s*0.32, c+Math.sin(3*Math.PI/4)*s*0.32],
          [c+Math.cos(5*Math.PI/4)*s*0.32, c+Math.sin(5*Math.PI/4)*s*0.32],
          [c+Math.cos(7*Math.PI/4)*s*0.32, c+Math.sin(7*Math.PI/4)*s*0.32],
        ].map(([x,y],i)=>(
          <path key={i} d={`M ${x} ${y-s*0.018} L ${x+s*0.018} ${y} L ${x} ${y+s*0.018} L ${x-s*0.018} ${y} Z`} fill={color}/>
        ))}
      </g>
    );
  }

  function Kazakh({ width = 460, height = 800, color = "#1A1612", opacity = 0.5, density = 1, accent }) {
    const tile = 280 * density;
    const cells = grid(width, height, tile);
    accent = accent || color;
    return (
      <svg className="pattern-svg" xmlns="http://www.w3.org/2000/svg"
           viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice"
           style={{opacity}}>
        <g>
          {cells.map((cell,i)=>(
            <g key={i} transform={`translate(${cell.x - tile/2} ${cell.y - tile/2})`}>
              <KzMotif s={tile} color={color} accent={accent}/>
            </g>
          ))}
        </g>
      </svg>
    );
  }

  // ===== RUSSIAN / SIBERIAN motif tile =====
  function RuMotif({ s, color, accent }) {
    const c = s / 2;
    // 8-point star (two overlapping squares rotated)
    const sq = (cx, cy, r) => {
      const p = [];
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2 - Math.PI / 2;
        p.push(`${cx + Math.cos(a)*r},${cy + Math.sin(a)*r}`);
      }
      return p.join(" ");
    };
    return (
      <g>
        {/* central big Alatyr */}
        <g fill="none" stroke={color} strokeWidth={s*0.013} strokeLinejoin="round">
          <polygon points={sq(c, c, s*0.26)}/>
          <g transform={`rotate(45 ${c} ${c})`}><polygon points={sq(c, c, s*0.26)}/></g>
          <polygon points={sq(c, c, s*0.12)}/>
          <g transform={`rotate(45 ${c} ${c})`}><polygon points={sq(c, c, s*0.12)}/></g>
        </g>
        <circle cx={c} cy={c} r={s*0.020} fill={color}/>

        {/* corner small Alatyrs (at tile corners) */}
        {[[0,0],[s,0],[s,s],[0,s]].map(([x,y],i)=>(
          <g key={i} fill="none" stroke={color} strokeWidth={s*0.010} strokeLinejoin="round">
            <polygon points={sq(x, y, s*0.13)}/>
            <g transform={`rotate(45 ${x} ${y})`}><polygon points={sq(x, y, s*0.13)}/></g>
          </g>
        ))}

        {/* Mezen-style geometric horse silhouettes top & bottom */}
        {[{y: s*0.08, flip: 1}, {y: s*0.92, flip: -1}].map((g,i)=>(
          <g key={"horse"+i} transform={`translate(${c} ${g.y}) scale(1 ${g.flip})`} fill={color}>
            {/* body */}
            <rect x={-s*0.10} y={-s*0.020} width={s*0.20} height={s*0.045}/>
            {/* legs */}
            <rect x={-s*0.085} y={s*0.025} width={s*0.012} height={s*0.045}/>
            <rect x={-s*0.030} y={s*0.025} width={s*0.012} height={s*0.045}/>
            <rect x={s*0.018} y={s*0.025} width={s*0.012} height={s*0.045}/>
            <rect x={s*0.073} y={s*0.025} width={s*0.012} height={s*0.045}/>
            {/* neck + head */}
            <path d={`M ${s*0.07} ${-s*0.020} L ${s*0.12} ${-s*0.065} L ${s*0.155} ${-s*0.065} L ${s*0.13} ${-s*0.020} Z`}/>
            {/* tail */}
            <path d={`M ${-s*0.10} ${-s*0.020} L ${-s*0.145} ${-s*0.065} L ${-s*0.13} ${-s*0.005} Z`}/>
            {/* mane dots */}
            <circle cx={-s*0.03} cy={-s*0.045} r={s*0.008}/>
            <circle cx={0} cy={-s*0.045} r={s*0.008}/>
            <circle cx={s*0.03} cy={-s*0.045} r={s*0.008}/>
          </g>
        ))}

        {/* zigzag/yolochka on left & right edges */}
        {[s*0.06, s*0.94].map((x,i)=>(
          <g key={"zig"+i} fill="none" stroke={color} strokeWidth={s*0.008} strokeLinecap="round">
            {Array.from({length:5}).map((_,k)=>{
              const yy = c - s*0.18 + k*s*0.09;
              const sgn = i===0 ? 1 : -1;
              return <path key={k} d={`M ${x} ${yy} l ${s*0.035*sgn} ${s*0.025} l ${-s*0.035*sgn} ${s*0.025}`}/>;
            })}
          </g>
        ))}

        {/* accent diamonds in N/S quarters */}
        {[[c, c - s*0.36], [c, c + s*0.36]].map(([x,y],i)=>(
          <g key={"d"+i}>
            <path d={`M ${x} ${y-s*0.025} L ${x+s*0.025} ${y} L ${x} ${y+s*0.025} L ${x-s*0.025} ${y} Z`} fill={accent}/>
          </g>
        ))}
      </g>
    );
  }

  function Russian({ width = 460, height = 800, color = "#1A1612", opacity = 0.5, density = 1, accent }) {
    const tile = 260 * density;
    const cells = grid(width, height, tile);
    accent = accent || color;
    return (
      <svg className="pattern-svg" xmlns="http://www.w3.org/2000/svg"
           viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice"
           style={{opacity}}>
        {cells.map((cell,i)=>(
          <g key={i} transform={`translate(${cell.x - tile/2} ${cell.y - tile/2})`}>
            <RuMotif s={tile} color={color} accent={accent}/>
          </g>
        ))}
      </svg>
    );
  }

  // =====================================================================
  // SOVIET CARPET — single big composition that fills hero like a real rug.
  // =====================================================================
  function SovietCarpet({ width = 460, height = 800, color = "#1A1612", opacity = 0.5, density = 1, accent }) {
    accent = accent || color;
    // We design the carpet at a fixed 600x900 viewBox and let it slice to fit.
    const W = 600, H = 900;
    const k = 0.85 + density * 0.1;

    return (
      <svg className="pattern-svg" xmlns="http://www.w3.org/2000/svg"
           viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice"
           style={{opacity}}>
        {/* ===== Top + bottom fringe ===== */}
        <g stroke={color} strokeWidth="2" strokeLinecap="round">
          {Array.from({length:30}).map((_,i)=>(
            <line key={"ft"+i} x1={i*20+10} y1="4" x2={i*20+10} y2="22"/>
          ))}
          {Array.from({length:30}).map((_,i)=>(
            <line key={"fb"+i} x1={i*20+10} y1="878" x2={i*20+10} y2="896"/>
          ))}
        </g>

        {/* Multiple borders */}
        <g fill="none" stroke={color}>
          <rect x="20" y="30" width="560" height="840" strokeWidth="6"/>
          <rect x="34" y="44" width="532" height="812" strokeWidth="2"/>
          <rect x="48" y="58" width="504" height="784" strokeWidth="6"/>
        </g>

        {/* Diamond chains between borders */}
        <g fill={color}>
          {Array.from({length:18}).map((_,i)=>{
            const x = 60 + i*26;
            return (
              <g key={"db"+i}>
                <path d={`M ${x} 38 l 8 8 l -8 8 l -8 -8 z`}/>
                <path d={`M ${x} 854 l 8 8 l -8 8 l -8 -8 z`}/>
              </g>
            );
          })}
          {Array.from({length:30}).map((_,i)=>{
            const y = 78 + i*26;
            if (y > 824) return null;
            return (
              <g key={"dlr"+i}>
                <path d={`M 38 ${y} l 8 8 l -8 8 l -8 -8 z`}/>
                <path d={`M 562 ${y} l 8 8 l -8 8 l -8 -8 z`}/>
              </g>
            );
          })}
        </g>

        {/* Inner hook border */}
        <g fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
          {Array.from({length:9}).map((_,i)=>{
            const x = 70 + i*55;
            return (
              <g key={"hk"+i}>
                <path d={`M ${x} 70 q 14 0 14 14 q 0 14 -14 14 q -14 0 -14 -14`}/>
                <path d={`M ${x} 830 q 14 0 14 -14 q 0 -14 -14 -14 q -14 0 -14 14`}/>
              </g>
            );
          })}
          {Array.from({length:13}).map((_,i)=>{
            const y = 110 + i*55;
            if (y > 790) return null;
            return (
              <g key={"hkv"+i}>
                <path d={`M 70 ${y} q 0 14 14 14 q 14 0 14 -14 q 0 -14 -14 -14`}/>
                <path d={`M 530 ${y} q 0 14 -14 14 q -14 0 -14 -14 q 0 -14 14 -14`}/>
              </g>
            );
          })}
        </g>

        {/* ===== Central medallion ===== */}
        <g transform={`translate(300 450)`}>
          {/* big diamond stack */}
          <g fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round">
            <polygon points={`0,${-260*k} ${160*k},0 0,${260*k} ${-160*k},0`}/>
            <polygon points={`0,${-220*k} ${130*k},0 0,${220*k} ${-130*k},0`}/>
            <polygon points={`0,${-160*k} ${100*k},0 0,${160*k} ${-100*k},0`}/>
          </g>
          {/* inner octagon stack */}
          <g fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round">
            <polygon points={`0,${-90*k} ${65*k},${-65*k} ${90*k},0 ${65*k},${65*k} 0,${90*k} ${-65*k},${65*k} ${-90*k},0 ${-65*k},${-65*k}`}/>
            <polygon points={`0,${-55*k} ${40*k},${-40*k} ${55*k},0 ${40*k},${40*k} 0,${55*k} ${-40*k},${40*k} ${-55*k},0 ${-40*k},${-40*k}`}/>
          </g>
          {/* central rosette (8-petal) */}
          <g fill={color}>
            {Array.from({length:8}).map((_,i)=>{
              const a = (i * Math.PI) / 4;
              const x = Math.cos(a) * 22 * k;
              const y = Math.sin(a) * 22 * k;
              return <ellipse key={i} cx={x} cy={y} rx={14*k} ry={6*k} transform={`rotate(${i*45} ${x} ${y})`}/>;
            })}
            <circle r={10*k}/>
          </g>
          {/* tassels */}
          <g fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
            <line x1="0" y1={-260*k} x2="0" y2={-310*k}/>
            <line x1="0" y1={260*k} x2="0" y2={310*k}/>
            <line x1={-160*k} y1="0" x2={-210*k} y2="0"/>
            <line x1={160*k} y1="0" x2={210*k} y2="0"/>
          </g>
        </g>

        {/* Four corner rosettes */}
        {[[150,180],[450,180],[150,720],[450,720]].map(([cx,cy],i)=>(
          <g key={"crn"+i} transform={`translate(${cx} ${cy})`}>
            <g fill="none" stroke={color} strokeWidth="2.5">
              <polygon points="0,-40 28,-28 40,0 28,28 0,40 -28,28 -40,0 -28,-28"/>
              <polygon points="0,-22 16,-16 22,0 16,16 0,22 -16,16 -22,0 -16,-16"/>
            </g>
            <g fill={color}>
              {Array.from({length:4}).map((_,k2)=>(
                <ellipse key={k2} rx="12" ry="4" transform={`rotate(${k2*45})`}/>
              ))}
              <circle r="5"/>
            </g>
          </g>
        ))}

        {/* Side diamonds */}
        {[[300,180],[300,720],[150,450],[450,450]].map(([cx,cy],i)=>(
          <g key={"mid"+i} transform={`translate(${cx} ${cy})`} fill="none" stroke={color} strokeWidth="2">
            <polygon points="0,-20 14,0 0,20 -14,0"/>
            <polygon points="0,-10 7,0 0,10 -7,0" fill={color} stroke="none"/>
          </g>
        ))}

        {/* Field texture dots */}
        <g fill={color} opacity="0.55">
          {Array.from({length:30}).map((_,i)=>{
            const x = 80 + ((i*173) % 440);
            const y = 100 + ((i*97) % 700);
            return <circle key={i} cx={x} cy={y} r="2.5"/>;
          })}
        </g>
      </svg>
    );
  }

  return { Kazakh, Russian, SovietCarpet };
})();

window.Patterns = Patterns;
