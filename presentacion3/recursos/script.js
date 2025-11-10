document.addEventListener('DOMContentLoaded', ()=> {
  const anios = document.querySelectorAll('#anio, #anio2, #anio3, #anio4, #anio5');
  anios.forEach(elemento => { if(elemento) elemento.textContent = new Date().getFullYear(); });

  const boton = document.querySelector('.alternar-navegacion');
  const navegacion = document.querySelector('.navegacion');
  if(boton && navegacion){
    boton.addEventListener('click', ()=> {
      navegacion.classList.toggle('abierto');
      if(navegacion.classList.contains('abierto')) navegacion.style.display = 'flex';
      else navegacion.style.display = '';
    });
  }

  const proyectosEjemplo = [
    {id:1, titulo:'DB-Simplifier JS', desc:'Librería que simplifica consultas a bases de datos', categoria:'librerias'},
    {id:2, titulo:'API Analytics Pro', desc:'Dashboard de métricas para desarrolladores', categoria:'apps'},
    {id:3, titulo:'Plugin Figma Code', desc:'Genera código automáticamente desde diseños', categoria:'plugins'},
    {id:4, titulo:'Hardware IoT', desc:'Dispositivo open-source para monitoreo', categoria:'hardware'},
    {id:5, titulo:'CLI DevTools', desc:'Herramientas de línea de comandos para desarrollo', categoria:'librerias'},
    {id:6, titulo:'UI Component Library', desc:'Colección de componentes reutilizables', categoria:'librerias'},
  ];

  function htmlTarjetaProyecto(p){
    return `
      <article class="tarjeta tarjeta-proyecto">
        <div class="media-tarjeta"><div class="marcador">${p.titulo}</div></div>
        <div class="cuerpo-tarjeta">
          <h3 class="titulo-tarjeta">${p.titulo}</h3>
          <p class="atenuado">${p.desc}</p>
        </div>
        <div class="meta-proyecto">
          <span>${p.categoria.toUpperCase()}</span>
          <a style="float:right;text-decoration:none" href="detalle-proyecto.html?id=${p.id}">Ver detalle →</a>
        </div>
      </article>
    `;
  }

  const listaProyectos = document.getElementById('lista-proyectos');
  const listaExplorar = document.getElementById('lista-explorar');

  if(listaProyectos){
    listaProyectos.innerHTML = proyectosEjemplo.slice(0,3).map(htmlTarjetaProyecto).join('');
  }
  if(listaExplorar){
    listaExplorar.innerHTML = proyectosEjemplo.map(htmlTarjetaProyecto).join('');
  }

  const busqueda = document.getElementById('busqueda');
  const filtro = document.getElementById('filtro');
  if(busqueda || filtro){
    const aplicarFiltro = ()=>{
      const termino = busqueda ? busqueda.value.trim().toLowerCase() : '';
      const categoria = filtro ? filtro.value : '';
      const filtrados = proyectosEjemplo.filter(p=>{
        const coincideTermino = termino === '' || p.titulo.toLowerCase().includes(termino) || p.desc.toLowerCase().includes(termino);
        const coincideCategoria = categoria === '' || p.categoria === categoria;
        return coincideTermino && coincideCategoria;
      });
      if(listaExplorar) listaExplorar.innerHTML = filtrados.map(htmlTarjetaProyecto).join('') || '<p class="atenuado">No se encontraron proyectos.</p>';
    };
    if(busqueda) busqueda.addEventListener('input', aplicarFiltro);
    if(filtro) filtro.addEventListener('change', aplicarFiltro);
  }

  document.querySelectorAll('form[data-validar]').forEach(formulario=>{
    formulario.addEventListener('submit', e=>{
      e.preventDefault();
      const datosFormulario = new FormData(formulario);
      const datos = Object.fromEntries(datosFormulario.entries());
      
      if(formulario.id === 'formularioRegistro'){
        if(!datos.nombre || datos.nombre.trim().length < 2){
          return alert('Introduce tu nombre completo.');
        }
        if(!datos.email || !datos.email.includes('@')) return alert('Introduce un email válido.');
        if(!datos.contrasena || datos.contrasena.length < 6) return alert('La contraseña debe tener al menos 6 caracteres.');
        if(datos.contrasena !== datos.contrasena2) return alert('Las contraseñas no coinciden.');
        alert('Registro simulado exitoso. (Este formulario es estático en la entrega.)');
        formulario.reset();
        return;
      }
      
      if(formulario.id === 'formularioLogin'){
        if(!datos.email || !datos.email.includes('@')) return alert('Introduce un email válido.');
        if(!datos.contrasena || datos.contrasena.length < 6) return alert('Contraseña inválida.');
        alert('Login simulado exitoso. (Entrega estática)');
        formulario.reset();
      }
    });
  });

  function obtenerParametrosURL(){
    const parametros = {};
    location.search.replace(/^\?/, '').split('&').forEach(par=>{
      if(!par) return;
      const [clave,valor] = par.split('=');
      parametros[decodeURIComponent(clave)] = decodeURIComponent(valor || '');
    });
    return parametros;
  }
  
  const parametros = obtenerParametrosURL();
  if(parametros.id){
    const idProyecto = Number(parametros.id);
    const proyecto = proyectosEjemplo.find(x=>x.id===idProyecto);
    if(proyecto){
      const titulo = document.getElementById('titulo-proyecto');
      const descripcion = document.getElementById('descripcion-proyecto');
      const categoria = document.getElementById('categoria-proyecto');
      if(titulo) titulo.textContent = proyecto.titulo;
      if(descripcion) descripcion.textContent = proyecto.desc + ' (Este contenido es estático y de ejemplo)';
      if(categoria) categoria.textContent = proyecto.categoria.toUpperCase() + ' • ' + new Date().toLocaleDateString();
    }
  }
});