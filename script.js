const tablero = document.getElementById("tablero");
const guia = document.getElementById("guia");

let seleccionadas = [];
let bloqueado = false;

// 📚 CONCEPTOS COMPLETOS (20 tipos de archivo)
const conceptos = [
{ id:1, nombre:"Word", descripcion:"Archivo .docx usado para crear documentos con texto, imágenes, tablas y formato profesional.", imagen:"img/word.png"},
{ id:2, nombre:"Excel", descripcion:"Archivo .xlsx para hojas de cálculo, fórmulas, gráficos y análisis de datos.", imagen:"img/excel.png"},
{ id:3, nombre:"PDF", descripcion:"Formato .pdf que mantiene el diseño original y se puede abrir en cualquier dispositivo.", imagen:"img/pdf.png"},
{ id:4, nombre:"PowerPoint", descripcion:"Archivo .pptx usado para presentaciones con diapositivas, animaciones e imágenes.", imagen:"img/ppt.png"},
{ id:5, nombre:"TXT", descripcion:"Archivo .txt de texto plano sin formato, ligero y compatible con todos los sistemas.", imagen:"img/txt.png"},
{ id:6, nombre:"JPG", descripcion:"Formato de imagen comprimida con pérdida de calidad, ideal para fotografías.", imagen:"img/jpg.png"},
{ id:7, nombre:"PNG", descripcion:"Formato de imagen sin pérdida que permite transparencias.", imagen:"img/png.png"},
{ id:8, nombre:"MP3", descripcion:"Archivo de audio comprimido muy usado para música y sonido.", imagen:"img/mp3.png"},
{ id:9, nombre:"MP4", descripcion:"Formato de video digital que combina imagen y audio en alta calidad.", imagen:"img/mp4.png"},
{ id:10, nombre:"ZIP", descripcion:"Archivo comprimido que reduce tamaño y agrupa múltiples archivos.", imagen:"img/zip.png"},
{ id:11, nombre:"RAR", descripcion:"Formato de compresión más avanzado que ZIP, permite dividir archivos grandes.", imagen:"img/rar.png"},
{ id:12, nombre:"HTML", descripcion:"Lenguaje de marcado usado para crear la estructura de páginas web.", imagen:"img/html.png"},
{ id:13, nombre:"CSS", descripcion:"Lenguaje que define el diseño y estilo visual de páginas web.", imagen:"img/css.png"},
{ id:14, nombre:"JS", descripcion:"Lenguaje de programación que añade interactividad a sitios web.", imagen:"img/js.png"},
{ id:15, nombre:"EXE", descripcion:"Archivo ejecutable que inicia programas en sistemas Windows.", imagen:"img/exe.png"},
{ id:16, nombre:"APK", descripcion:"Archivo instalador de aplicaciones en dispositivos Android.", imagen:"img/apk.png"},
{ id:17, nombre:"ISO", descripcion:"Imagen de disco que contiene una copia exacta de un sistema o software.", imagen:"img/iso.png"},
{ id:18, nombre:"CSV", descripcion:"Archivo de datos separados por comas usado en bases de datos y hojas de cálculo.", imagen:"img/csv.png"},
{ id:19, nombre:"JSON", descripcion:"Formato ligero de intercambio de datos usado en aplicaciones y APIs.", imagen:"img/json.png"},
{ id:20, nombre:"XML", descripcion:"Formato de datos estructurados utilizado para almacenar y transportar información.", imagen:"img/xml.png"}
];

// 📋 CREAR GUÍA
conceptos.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.nombre}: ${c.descripcion}`;
    guia.appendChild(li);
});

// 🔁 CREAR TARJETAS (60)
let tarjetas = [];

conceptos.forEach(c => {
    tarjetas.push({ id:c.id, tipo:"nombre", contenido:c.nombre });
    tarjetas.push({ id:c.id, tipo:"descripcion", contenido:c.descripcion });
    tarjetas.push({ id:c.id, tipo:"imagen", contenido:c.imagen });
});

// 🔀 MEZCLAR
tarjetas.sort(() => Math.random() - 0.5);

// 🎮 CREAR TABLERO
tarjetas.forEach(t => {
    const div = document.createElement("div");
    div.classList.add("tarjeta");

    div.dataset.id = t.id;
    div.dataset.tipo = t.tipo;
    div.dataset.valor = t.contenido;

    div.addEventListener("click", () => voltear(div));

    tablero.appendChild(div);
});

// 🔄 VOLTEAR
function voltear(tarjeta) {
    if (bloqueado) return;
    if (tarjeta.classList.contains("volteada")) return;
    if (seleccionadas.length === 3) return;

    tarjeta.classList.add("volteada");

    if (tarjeta.dataset.tipo === "imagen") {
        tarjeta.innerHTML = `<img src="${tarjeta.dataset.valor}">`;
    } else {
        tarjeta.textContent = tarjeta.dataset.valor;
    }

    seleccionadas.push(tarjeta);

    if (seleccionadas.length === 3) {
        verificar();
    }
}

// ✅ VERIFICAR
function verificar() {
    bloqueado = true;

    const [a, b, c] = seleccionadas;

    if (a.dataset.id === b.dataset.id && b.dataset.id === c.dataset.id) {
        seleccionadas.forEach(t => t.classList.add("correcta"));
        seleccionadas = [];
        bloqueado = false;
    } else {
        setTimeout(() => {
            seleccionadas.forEach(t => {
                t.classList.remove("volteada");
                t.innerHTML = "";
            });
            seleccionadas = [];
            bloqueado = false;
        }, 1200);
    }
}