/* Asistente guiado de IngEcAmur (ingecamur.es). Sin IA, sin cookies, sin servicios externos. */
(function () {
  var s = document.currentScript, base = s ? s.src.replace(/asistente\.js.*$/, '') : '/';
  var EN = (document.documentElement.lang || '').indexOf('en') === 0;
  var WA = 'https://wa.me/34620227721?text=';
  var FORM = 'https://tally.so/r/RWdjXd?origen=' + (EN ? 'ingecamur.es-en' : 'ingecamur.es') + '&canal=asistente';

  var T = {
    inicio: { t: 'Hola, soy el asistente de IngEcAmur. ¿En qué te podemos ayudar?',
      r: [['Medir mi finca', 'medir'], ['Corregir datos del Catastro', 'catastro'], ['Solicitar un archivo GML', 'gml'], ['Pedir presupuesto', 'presupuesto']],
      mas: 'Ver más preguntas', tmas: 'Elige la pregunta que más se parezca a tu caso:',
      o: [['¿Podéis medir mi finca para saber cuántos metros tiene?', 'medir'], ['¿Podéis localizar mi finca si no sé exactamente dónde está?', 'localizar'],
          ['¿Podéis marcar los límites de mi finca sobre el terreno?', 'linderos'], ['¿Qué puedo hacer si los metros de mi escritura no coinciden con los del Catastro?', 'catastro'],
          ['Me piden un archivo GML en la notaría. ¿Podéis prepararlo?', 'gml'], ['¿Podéis ayudarme a dividir una finca en dos parcelas?', 'segregar'],
          ['He heredado una finca y el Registro no coincide con el Catastro. ¿Me podéis ayudar?', 'herencia'], ['Tengo un problema de lindes con el vecino o se ha metido en mi finca', 'vecino'], ['Me ha llegado una notificación del Registro por el artículo 199', 'r199'],
          ['Necesito acreditar la antigüedad de mi casa o nave', 'antiguedad'], ['¿Podéis hacer una tasación de mi finca?', 'tasacion'],
          ['Necesito un informe pericial para un juicio', 'pericial'], ['¿Cuánto cuesta medir mi finca y qué documentación necesitáis?', 'presupuesto'],
          ['¿Trabajáis en mi zona?', 'zonas'], ['Es otra cosa', 'otra']] },
    medir: { t: 'Sí. Medimos fincas rústicas y urbanas con receptores GNSS de precisión centimétrica y te decimos los metros reales. Te entregamos el plano y el archivo GML, que es lo que piden la notaría, el Catastro y el Registro.', p: 'medicion/', w: 'medir una finca' },
    localizar: { t: 'Sí, somos rastreadores de fincas. Localizamos fincas heredadas, sin referencia catastral o que no se sabe dónde están, cruzando el Registro, el Catastro y fotos aéreas antiguas.', p: 'localizar-fincas/', g: 'guias/finca-heredada-no-se-donde-esta/', w: 'localizar una finca' },
    linderos: { t: 'Sí. Medimos la finca y marcamos sus límites sobre el terreno (replanteo y amojonamiento), para que sepas por dónde van exactamente los lindes antes de vallar o construir.', p: 'medicion/', w: 'marcar los límites de una finca' },
    catastro: { t: 'Es lo más habitual. Medimos la finca real, comparamos las tres superficies (escritura, Catastro y medición) y te decimos el camino para que todo cuadre: corrección en el Catastro, expediente del artículo 199 en el Registro o rectificación en notaría. Para esto hay que revisar tus documentos.', p: 'catastro/', g: 'guias/escrituras-y-catastro-no-coinciden/', w: 'que la escritura no coincide con el Catastro' },
    gml: { t: 'Sí. El GML es el archivo con el dibujo exacto de la finca que piden la notaría, el Catastro y el Registro. Medimos la finca y lo preparamos. Si la notaría pide un IVG del Catastro, también lo tramitamos.', p: 'catastro/', g: 'guias/que-es-un-ivg/', w: 'un archivo GML para la notaría' },
    segregar: { t: 'Sí. Preparamos la división: medición, planos, descripción de cada parcela para la escritura y el GML para la notaría y el Registro. Antes comprobamos si el Ayuntamiento permite dividir esa finca.', p: 'segregaciones/', g: 'guias/como-segregar-una-finca-rustica/', w: 'dividir una finca' },
    herencia: { t: 'Sí, es muy frecuente en las herencias. Identificamos la finca, comparamos el Registro, el Catastro y la realidad, y os decimos cómo dejarlo todo bien para repartir o vender. Si hace falta, también la valoramos.', p: 'localizar-fincas/', g: 'guias/finca-heredada-no-se-donde-esta/', p2: ['Tasaciones', 'tasaciones/'], w: 'una finca heredada que no coincide con el Catastro' },
    vecino: { t: 'Medimos tu finca y la comparamos con el Registro, el Catastro y fotos aéreas antiguas para saber por dónde va el linde. Muchas veces se arregla con un acuerdo entre vecinos, y mediamos. Si va a juicio, hacemos el informe pericial y vamos a ratificarlo.', p: 'periciales/', w: 'un problema de lindes con el vecino' },
    r199: { t: 'Esa notificación avisa de que un vecino quiere inscribir los límites de su finca y te da un plazo para oponerte (20 días). No la dejes pasar: comprobamos sobre el terreno si su dibujo se mete en tu finca y, si es así, preparamos tu oposición con informe técnico.', p: 'catastro/', g: 'guias/notificacion-articulo-199/', w: 'una notificación del Registro por el artículo 199' },
    antiguedad: { t: 'Sí. Hacemos certificados de antigüedad de viviendas, naves y construcciones agrarias, con fotos aéreas históricas y planos. Sirven para la notaría, el Registro y el Catastro.', p: 'antiguedad/', w: 'un certificado de antigüedad' },
    tasacion: { t: 'Sí. Tasamos y valoramos fincas para herencias, repartos entre hermanos, ventas y juicios. Y si hay desacuerdo entre herederos, mediamos.', p: 'tasaciones/', w: 'una tasación' },
    pericial: { t: 'Sí. Hacemos informes periciales de lindes, invasiones de finca, servidumbres y caminos, con medición real y estudio del Registro, el Catastro y fotos aéreas, y vamos al juicio a ratificarlos. Trabajamos también con despachos de abogados.', p: 'periciales/', p2: ['Para abogados', 'abogados/'], w: 'un informe pericial' },
    presupuesto: { t: 'El presupuesto es gratis. El precio depende de la superficie, del terreno y los accesos, de dónde esté la finca y de lo que haya que hacer después (solo medir, o también arreglar Catastro y Registro). Para dártelo nos basta con la referencia catastral o la dirección y, si la tienes, la nota simple o la escritura.', w: 'pedir presupuesto' },
    zonas: { t: 'Trabajamos en la Región de Murcia, Alicante (Costa Blanca, Vega Baja y el interior), Valencia y Albacete. Para Madrid hacemos sin desplazarnos todo lo que se puede hacer sobre documentación y cartografía.', p: 'zonas/', w: 'trabajar en mi zona' },
    otra: { t: 'Cuéntanoslo directamente: por WhatsApp te contesta una persona del equipo, o rellena el formulario y te llamamos.', w: 'una consulta' }
  };
  var TE = {
    inicio: { t: 'Hello, I am the IngEcAmur assistant. How can we help you?',
      r: [['Survey my property', 'medir'], ['Correct Cadastre data', 'catastro'], ['Get a GML file', 'gml'], ['Ask for a quote', 'presupuesto']],
      mas: 'More questions', tmas: 'Choose the question closest to your case:',
      o: [['Can you survey my property to know its size?', 'medir'], ['Can you find my land if I do not know exactly where it is?', 'localizar'],
          ['Can you mark my boundaries on the ground?', 'linderos'], ['My deeds and the Cadastre show different areas. What can I do?', 'catastro'],
          ['The notary asks for a GML file. Can you prepare it?', 'gml'], ['Can you help me split a plot in two?', 'segregar'],
          ['I inherited a property and the Land Registry does not match the Cadastre', 'herencia'], ['I have a boundary problem with my neighbour', 'vecino'], ['I received a Land Registry notice (article 199)', 'r199'],
          ['I need to prove how old my house is', 'antiguedad'], ['Can you value my property?', 'tasacion'],
          ['I need an expert report for a court case', 'pericial'], ['How much does a survey cost and what do you need?', 'presupuesto'],
          ['Do you work in my area?', 'zonas'], ['Something else', 'otra']] },
    medir: { t: 'Yes. We survey rural and urban properties with centimetre-accurate GNSS receivers and give you the real area, the plan and the GML file required by the notary, the Cadastre and the Land Registry.', w: 'a property survey' },
    localizar: { t: 'Yes. We trace inherited plots, plots without a cadastral reference or plots nobody knows where they are, cross-checking the Land Registry, the Cadastre and old aerial photos.', w: 'locating a property' },
    linderos: { t: 'Yes. We survey the property and mark its boundaries on the ground, so you know exactly where they run before fencing or building.', w: 'marking my boundaries' },
    catastro: { t: 'This is very common in Spain. We measure the real plot, compare the three areas (deeds, Cadastre and survey) and tell you how to make them match: cadastral correction, Land Registry procedure (article 199) or a notary deed. We need to review your documents.', w: 'deeds that do not match the Cadastre' },
    gml: { t: 'Yes. The GML is the file with the exact shape of the plot that the notary, the Cadastre and the Land Registry ask for. We survey the plot and prepare it, and we also handle the cadastral validation report (IVG) if needed.', w: 'a GML file for the notary' },
    segregar: { t: 'Yes. We prepare the split: survey, plans, description of each plot for the deed and GML for the notary and the Land Registry. First we check whether the Town Council allows it.', w: 'splitting a plot' },
    herencia: { t: 'Yes, this is very common with inheritances. We identify the property, compare the Land Registry, the Cadastre and reality, and tell you how to put everything right to divide or sell it. We can also value it.', w: 'an inherited property' },
    vecino: { t: 'We survey your property and compare it with the Land Registry, the Cadastre and old aerial photos to establish the boundary. Often an agreement between neighbours is possible, and we mediate. If it goes to court, we write the expert report and attend the hearing.', w: 'a boundary problem with my neighbour' },
    r199: { t: 'That notice means a neighbour wants to register the boundaries of their plot, and it gives you a deadline to object (20 days). Do not let it pass: we check on site whether their drawing overlaps your property and, if so, prepare your objection with a technical report.', w: 'a Land Registry notice (article 199)' },
    antiguedad: { t: 'Yes. We issue certificates of age for houses, warehouses and farm buildings, with historical aerial photos and plans, for the notary, the Land Registry and the Cadastre.', w: 'a certificate of age' },
    tasacion: { t: 'Yes. We value properties for inheritances, divisions between heirs, sales and court cases, and we mediate when heirs disagree.', w: 'a valuation' },
    pericial: { t: 'Yes. We write expert reports on boundaries, encroachments, easements and paths, and we attend court to ratify them. We also work with law firms.', w: 'an expert report' },
    presupuesto: { t: 'The quote is free. The price depends on the size, the terrain and access, the location and what has to be done afterwards (just the survey, or also Cadastre and Land Registry work). We only need the cadastral reference or the address and, if you have them, the Land Registry extract (nota simple) or the deeds.', w: 'a quote' },
    zonas: { t: 'We work in the Region of Murcia, Alicante (Costa Blanca, Vega Baja and inland), Valencia and Albacete. For Madrid we do remotely everything that can be done from documents and maps.', w: 'my area' },
    otra: { t: 'Just tell us: on WhatsApp a member of our team will answer you, or fill in the form and we will call you.', w: 'a question' }
  };
  var L = EN ? {
    cab: 'Can we help?', pie: 'Automatic assistant: it does not give prices or opinions on your case. Our team does that.',
    bt: 'Need help?', donde: 'Optional: where is the property? (town)', ref: 'Optional: cadastral reference or address',
    seguir: 'Continue', saltar: 'Skip', ph1: 'e.g. Benissa', ph2: 'e.g. 03001A012000340000XY',
    estudiar: 'To study your case and send you a free quote, contact us:', wa: 'Chat on WhatsApp', fo: 'Free quote (form)',
    ver: 'See the service page (in Spanish)', guia: 'Read the guide (in Spanish)', ver2: 'See ', volver: 'Back to start',
    msg: 'Hello, I am writing from ingecamur.es. My question is about ', en: 'Town: ', rc: 'Reference/address: ', cerrar: 'Close'
  } : {
    cab: '¿Te ayudamos?', pie: 'Asistente automático: no da precios ni opiniones sobre tu caso. Para eso te atiende el equipo.',
    bt: '¿Te ayudo?', donde: 'Si quieres (no es obligatorio): ¿en qué municipio está la finca?', ref: 'Si la tienes (no es obligatorio): referencia catastral o dirección',
    seguir: 'Seguir', saltar: 'Saltar', ph1: 'p. ej. Mula', ph2: 'p. ej. 30029A012000340000XY',
    estudiar: 'Para estudiar tu caso y darte presupuesto gratis, escríbenos:', wa: 'Hablar por WhatsApp', fo: 'Pedir presupuesto gratis (formulario)',
    ver: 'Ver la página del servicio', guia: 'Leer la guía sobre esto', ver2: 'Ver ', volver: 'Volver al principio',
    msg: 'Hola, os escribo desde ingecamur.es. Os consulto por ', en: 'Municipio: ', rc: 'Referencia catastral o dirección: ', cerrar: 'Cerrar'
  };
  if (EN) T = TE;

  var css = '.asis-bt{background:#99cc00!important;color:#141414!important}' +
    '.asis{position:fixed;right:16px;bottom:16px;z-index:70;width:360px;max-width:calc(100vw - 24px);max-height:min(620px,calc(100vh - 32px));background:#fff;border-radius:14px;box-shadow:0 10px 40px rgba(0,0,0,.35);display:none;flex-direction:column;overflow:hidden;font-family:"DejaVu Sans",Verdana,sans-serif}' +
    '.asis.abierto{display:flex}' +
    '.asis-cab{background:#141414;color:#fff;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:3px solid #fc9c00}' +
    '.asis-cab b{font-size:15px}.asis-cab button{background:none;border:0;color:#fff;font-size:24px;line-height:1;cursor:pointer;padding:0 4px}' +
    '.asis-cu{padding:14px;overflow-y:auto;display:flex;flex-direction:column;gap:10px;background:#f4f4f2}' +
    '.asis-m{background:#fff;border:1px solid #dedbd5;border-radius:12px 12px 12px 3px;padding:10px 12px;font-size:14.5px;line-height:1.45;color:#141414}' +
    '.asis-u{align-self:flex-end;background:#f1f8dc;border:1px solid #99cc00;border-radius:12px 12px 3px 12px;padding:8px 12px;font-size:14px}' +
    '.asis-op{display:flex;flex-direction:column;gap:6px}' +
    '.asis-op button,.asis-op a{font:inherit;font-size:14px;text-align:left;background:#fff;border:1.5px solid #99cc00;color:#141414;border-radius:10px;padding:9px 12px;cursor:pointer;text-decoration:none;display:block}' +
    '.asis-op button:hover,.asis-op a:hover{background:#f1f8dc}' +
    '.asis-op .wa{background:#25d366;border-color:#25d366;color:#fff;font-weight:700}' +
    '.asis-op .fo{background:#fc9c00;border-color:#fc9c00;color:#141414;font-weight:700}' +
    '.asis-op .vo{border-color:#dedbd5;color:#4a4a4a}' +
    '.asis-in{display:flex;flex-direction:column;gap:6px}.asis-in input{font:inherit;font-size:15px;padding:9px 10px;border:1.5px solid #dedbd5;border-radius:8px}.asis-in div{display:flex;gap:6px}.asis-in button{flex:1;font:inherit;font-size:14px;border-radius:10px;padding:8px;cursor:pointer;border:1.5px solid #99cc00;background:#99cc00;color:#141414;font-weight:700}.asis-in .sa{background:#fff;border-color:#dedbd5;color:#4a4a4a;font-weight:400}' +
    '.asis-pie{font-size:11.5px;color:#4a4a4a;padding:8px 14px;background:#fff;border-top:1px solid #dedbd5}' +
    '@media(max-width:520px){.flot a,.flot button{white-space:nowrap;font-size:12.5px!important;padding:12px 4px!important;gap:4px!important}.flot{gap:6px!important;left:8px!important;right:8px!important}.flot svg{flex:none}.asis{right:12px;left:12px;bottom:12px;width:auto;max-width:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var p = document.createElement('div'); p.className = 'asis'; p.setAttribute('role', 'dialog'); p.setAttribute('aria-label', 'Asistente de IngEcAmur');
  p.innerHTML = '<div class="asis-cab"><b>' + L.cab + '</b><button type="button" aria-label="' + L.cerrar + '">×</button></div><div class="asis-cu"></div>' +
    '<div class="asis-pie">' + L.pie + '</div>';
  document.body.appendChild(p);
  var cu = p.querySelector('.asis-cu');

  function burbuja(txt, cls) { var d = document.createElement('div'); d.className = cls; d.textContent = txt; cu.appendChild(d); return d; }
  function opciones(lista) {
    var d = document.createElement('div'); d.className = 'asis-op';
    lista.forEach(function (o) { d.appendChild(o); }); cu.appendChild(d); cu.scrollTop = cu.scrollHeight;
  }
  function boton(txt, fn, cls) { var b = document.createElement('button'); b.type = 'button'; b.textContent = txt; if (cls) b.className = cls; b.onclick = fn; return b; }
  function enlace(txt, url, cls, nueva) { var a = document.createElement('a'); a.href = url; a.textContent = txt; if (cls) a.className = cls; if (nueva) { a.target = '_blank'; a.rel = 'noopener'; } return a; }

  function elegir(lista) {
    opciones(lista.map(function (o) {
      return boton(o[0], function () { this.parentNode.remove(); burbuja(o[0], 'asis-u'); tema(o[1]); });
    }));
  }
  function inicio() {
    burbuja(T.inicio.t, 'asis-m');
    elegir(T.inicio.r);
    cu.lastChild.appendChild(boton(T.inicio.mas, function () {
      this.parentNode.remove(); burbuja(T.inicio.mas, 'asis-u'); burbuja(T.inicio.tmas, 'asis-m'); elegir(T.inicio.o);
    }, 'vo'));
  }
  function pregunta(txt, ph, fn) {
    burbuja(txt, 'asis-m');
    var d = document.createElement('div'); d.className = 'asis-in';
    var i = document.createElement('input'); i.type = 'text'; i.placeholder = ph; i.maxLength = 80;
    var f = document.createElement('div');
    function fin(v) { d.remove(); if (v) burbuja(v, 'asis-u'); fn(v); }
    f.appendChild(boton(L.seguir, function () { fin(i.value.trim()); }));
    f.appendChild(boton(L.saltar, function () { fin(''); }, 'sa'));
    i.onkeydown = function (e) { if (e.key === 'Enter') fin(i.value.trim()); };
    d.appendChild(i); d.appendChild(f); cu.appendChild(d); cu.scrollTop = cu.scrollHeight; i.focus();
  }
  function tema(k) {
    var x = T[k];
    burbuja(x.t, 'asis-m');
    pregunta(L.donde, L.ph1, function (mun) {
      pregunta(L.ref, L.ph2, function (ref) { contacto(k, x, mun, ref); });
    });
  }
  function contacto(k, x, mun, ref) {
    var l = [], m = L.msg + x.w + '.';
    if (mun) m += '\n' + L.en + mun;
    if (ref) m += '\n' + L.rc + ref;
    var f = FORM + '&tema=' + k + (mun ? '&municipio=' + encodeURIComponent(mun) : '') + (ref ? '&referencia=' + encodeURIComponent(ref) : '');
    burbuja(L.estudiar, 'asis-m');
    l.push(enlace(L.wa, WA + encodeURIComponent(m), 'wa', true));
    l.push(enlace(L.fo, f, 'fo', true));
    if (x.g) l.push(enlace(L.guia, base + x.g));
    if (x.p) l.push(enlace(L.ver, base + x.p));
    if (x.p2) l.push(enlace(L.ver2 + x.p2[0], base + x.p2[1]));
    l.push(boton(L.volver, function () { cu.innerHTML = ''; inicio(); }, 'vo'));
    opciones(l);
  }

  function abrir() { p.classList.add('abierto'); if (!cu.firstChild) inicio(); var f = document.querySelector('.flot'); if (f) f.style.visibility = 'hidden'; }
  function cerrar() { p.classList.remove('abierto'); var f = document.querySelector('.flot'); if (f) f.style.visibility = ''; }
  p.querySelector('.asis-cab button').onclick = cerrar;
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrar(); });

  var bt = document.createElement('button'); bt.type = 'button'; bt.className = 'asis-bt';
  bt.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z"/></svg><span>' + L.bt + '</span>';
  bt.onclick = abrir;
  var flot = document.querySelector('.flot');
  if (flot) flot.insertBefore(bt, flot.firstChild);
  else { bt.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:60;font:inherit;font-weight:700;border:0;border-radius:50px;padding:11px 18px'; document.body.appendChild(bt); }
})();
