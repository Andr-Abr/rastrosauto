document.addEventListener('DOMContentLoaded', function () {
    const paisSelect = document.getElementById('pais');
    const departamentoSelect = document.getElementById('departamento');
    const ciudadSelect = document.getElementById('ciudad');

    // Lista estática de países como fallback
    const paisesComunes = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia",
        "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Belarus",
        "Belgium", "Belize", "Bolivia", "Bosnia and Herzegovina", "Brazil", "Bulgaria",
        "Cambodia", "Cameroon", "Canada", "Chile", "China", "Colombia", "Costa Rica",
        "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Dominican Republic",
        "Ecuador", "Egypt", "El Salvador", "Estonia", "Ethiopia", "Finland", "France",
        "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Honduras", "Hungary",
        "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
        "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Latvia", "Lebanon",
        "Libya", "Lithuania", "Luxembourg", "Malaysia", "Malta", "Mexico", "Morocco",
        "Netherlands", "New Zealand", "Nicaragua", "Nigeria", "Norway", "Oman", "Pakistan",
        "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
        "Romania", "Russia", "Saudi Arabia", "Serbia", "Singapore", "Slovakia", "Slovenia",
        "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland",
        "Syria", "Taiwan", "Thailand", "Tunisia", "Turkey", "Ukraine", "United Arab Emirates",
        "United Kingdom", "United States", "Uruguay", "Venezuela", "Vietnam", "Yemen"
    ];

    // Cargar países con fetch nativo y fallback
    function cargarPaises() {
        // Intentar cargar desde RestCountries
        fetch('https://restcountries.com/v3.1/all', {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('API no disponible');
            }
            return response.json();
        })
        .then(data => {
            const countries = data
                .map(country => country.name.common)
                .sort((a, b) => a.localeCompare(b));

            countries.forEach(country => {
                const option = new Option(country, country);
                paisSelect.add(option);
            });
            console.log('Países cargados desde API');
        })
        .catch(error => {
            console.warn('No se pudo cargar desde API, usando lista local:', error);
            // Usar lista local como fallback
            paisesComunes.forEach(country => {
                const option = new Option(country, country);
                paisSelect.add(option);
            });
        });
    }

    cargarPaises();

// Lista estática de departamentos y ciudades
    const departamentosYciudades = {
        "Colombia": {
            "Amazonas": ["Leticia", "El encanto", "La chorrera", "La pedrera", "La victoria", "Miriti-parana", "Puerto alegria", "Puerto arica", "Puerto narino", "Santander", "Tarapaca"],
            "Antioquia": ["Abejorral", "Abriaqui", "Alejandria", "Amaga", "Amalfi", "Andes", "Angelopolis", "Angostura", "Anori", "Anza", "Apartado", "Arboletes", "Argelia", "Armenia", "Barbosa", "Bello", "Belmira", "Betania", "Betulia", "Briceno", "Buritica", "Caceres", "Caicedo", "Caldas", "Campamento", "Canasgordas", "Caracoli", "Caramanta", "Carepa", "Carmen de viboral", "Carolina", "Caucasia", "Chigorodo", "Cisneros", "Ciudad bolivar", "Cocorna", "Concepcion", "Concordia", "Copacabana", "Dabeiba", "Don matias", "Ebejico", "El bagre", "Entrerrios", "Envigado", "Fredonia", "Frontino", "Giraldo", "Girardota", "Gomez plata", "Granada", "Guadalupe", "Guarne", "Guatape", "Heliconia", "Hispania", "Itagui", "Ituango", "Jardin", "Jerico", "La ceja", "La estrella", "La pintada", "La union", "Liborina", "Maceo", "Marinilla", "Medellin", "Montebello", "Murindo", "Mutata", "Narino", "Nechi", "Necocli", "Olaya", "Penol", "Peque", "Pueblorrico", "Puerto berrio", "Puerto nare", "Puerto triunfo", "Remedios", "Retiro", "Rionegro", "Sabanalarga", "Sabaneta", "Salgar", "San andres", "San carlos", "San francisco", "San jeronimo", "San jose de la montana", "San juan de uraba", "San luis", "San pedro", "San pedro de uraba", "San rafael", "San roque", "San vicente", "Santa barbara", "Santa fe de antioquia", "Santa rosa de osos", "Santo domingo", "Santuario", "Segovia", "Sonson", "Sopetran", "Tamesis", "Taraza", "Tarso", "Titiribi", "Toledo", "Turbo", "Uramita", "Urrao", "Valdivia", "Valparaiso", "Vegachi", "Venecia", "Vigia del fuerte", "Yali", "Yarumal", "Yolombo", "Yondo", "Zaragoza"],
            "Arauca": ["Arauca", "Arauquita", "Cravo norte", "Fortul", "Puerto rondon", "Saravena", "Tame"],
            "Atlántico": ["Baranoa", "Barranquilla", "Campo de la cruz", "Candelaria", "Galapa", "Juan de acosta", "Luruaco", "Malambo", "Manati", "Palmar de varela", "Piojo", "Polonuevo", "Ponedera", "Puerto colombia", "Repelon", "Sabanagrande", "Sabanalarga", "Santa lucia", "Santo tomas", "Soledad", "Suan", "Tubara", "Usiacuri"],
            "Bolívar": ["Achi", "Altos del rosario", "Arenal", "Arjona", "Arroyohondo", "Barranco de loba", "Calamar", "Cantagallo", "Cartagena de indias", "Cicuco", "Clemencia", "Cordoba", "El carmen de bolivar", "El guamo", "El penon", "Hatillo de loba", "Magangue", "Mahates", "Margarita", "Maria la baja", "Mompos", "Montecristo", "Morales", "Pinillos", "Regidor", "Rioviejo", "San cristobal", "San estanislao", "San fernando", "San jacinto", "San jacinto del cauca", "San juan nepomuceno", "San martin de loba", "San pablo", "Santa catalina", "Santa rosa", "Santa rosa del sur", "Simiti", "Soplaviento", "Talaigua nuevo", "Tiquisio", "Turbaco", "Turbana", "Villanueva", "Zambrano"],
            "Boyacá": ["Almeida", "Aquitania", "Arcabuco", "Belen", "Berbeo", "Beteitiva", "Boavita", "Boyaca", "Briceno", "Buenavista", "Busbanza", "Caldas", "Campohermoso", "Cerinza", "Chinavita", "Chiquinquira", "Chiquiza", "Chiscas", "Chita", "Chitaraque", "Chivata", "Chivor", "Cienega", "Combita", "Coper", "Corrales", "Covarachia", "Cubara", "Cucaita", "Cuitiva", "Duitama", "El cocuy", "El espino", "Firavitoba", "Floresta", "Gachantiva", "Gameza", "Garagoa", "Guacamayas", "Guateque", "Guayata", "Guican", "Iza", "Jenesano", "Jerico", "La capilla", "La uvita", "La victoria", "Labranzagrande", "Macanal", "Maripi", "Miraflores", "Mongua", "Mongui", "Moniquira", "Motavita", "Muzo", "Nobsa", "Nuevo colon", "Oicata", "Otanche", "Pachavita", "Paez", "Paipa", "Pajarito", "Panqueba", "Pauna", "Paya", "Paz de rio", "Pesca", "Pisva", "Puerto boyaca", "Quipama", "Ramiriqui", "Raquira", "Rondon", "Saboya", "Sachica", "Samaca", "San eduardo", "San josede pare", "San luis de gaceno", "San mateo", "San miguel de sema", "San pablo de borbur", "Santa maria", "Santa rosa de viterbo", "Santa sofia", "Santana", "Sativanorte", "Sativasur", "Siachoque", "Soata", "Socha", "Socota", "Sogamoso", "Somondoco", "Sora", "Soraca", "Sotaquira", "Susacon", "Sutamarchan", "Sutatenza", "Tasco", "Tenza", "Tibana", "Tibasosa", "Tinjaca", "Tipacoque", "Toca", "Togui", "Topaga", "Tota", "Tunja", "Tunungua", "Turmeque", "Tuta", "Tutaza", "Umbita", "Ventaquemada", "Villa de leiva", "Viracacha", "Zetaquira"],
            "Caldas": ["Aguadas", "Anserma", "Aranzazu", "Belalcazar", "Chinchina", "Filadelfia", "La dorada", "La merced", "Manizales", "Manzanares", "Marmato", "Marquetalia", "Marulanda", "Neira", "Norcasia", "Pacora", "Palestina", "Pensilvania", "Riosucio", "Risaralda", "Salamina", "Samana", "San jose", "Supia", "Victoria", "Villamaria", "Viterbo"],
            "Caquetá": ["Albania", "Belen de los andaquies", "Cartagena del chaira", "Curillo", "El doncello", "El paujil", "Florencia", "Milan", "Montanita", "Morelia", "Puerto rico", "San jose del fragua", "San vicente del caguan", "Solano", "Solita", "Valparaiso"],
            "Casanare": ["Aguazul", "Chameza", "Hato corozal", "La salina", "Mani", "Monterrey", "Nunchia", "Orocue", "Paz de ariporo", "Pore", "Recetor", "Sabanalarga", "Sacama", "San luis de palenque", "Tamara", "Tauramena", "Trinidad", "Villanueva", "Yopal"],
            "Cauca": ["Almaguer", "Argelia", "Balboa", "Bolivar", "Buenos aires", "Cajibio", "Caldono", "Caloto", "Corinto", "El tambo", "Florencia", "Guapi", "Inza", "Jambalo", "La sierra", "La vega", "Lopez", "Mercaderes", "Miranda", "Morales", "Padilla", "Paez", "Patia", "Piamonte", "Piendamo", "Popayan", "Puerto tejada", "Purace", "Rosas", "San sebastian", "Santa rosa", "Santander de quilichao", "Silvia", "Sotara", "Suarez", "Sucre", "Timbio", "Timbiqui", "Toribio", "Totoro", "Villa rica"],
            "Cesar": ["Aguachica", "Agustin codazzi", "Astrea", "Becerril", "Bosconia", "Chimi hagua", "Chiriguana", "Curumani", "El copey", "El paso", "Gamarra", "Gonzalez", "La gloria", "La jagua de ibirico", "La paz", "Manaure balcon del cesar", "Pailitas", "Pelaya", "Pueblo bello", "Rio de oro", "San alberto", "San diego", "San martin", "Tamalameque", "Valledupar"],
            "Chocó": ["Acandi", "Alto baudo", "Atrato", "Bagado", "Bahia solano", "Bajo baudo", "Bojaya", "Carmen del darien", "Certegui", "Condoto", "El canton del san pablo", "El carmen", "El litoral del san juan", "Itsmina", "Jurado", "Lloro", "Medio atrato", "Medio baudo", "Medio san juan", "Novita", "Nuqui", "Quibdo", "Rio iro", "Rio quito", "Riosucio", "San jose del palmar", "Sipi", "Tado", "Unguia", "Union panamericana"],
            "Córdoba": ["Ayapel", "Buenavista", "Canalete", "Cerete", "Chima", "Chinu", "Cienaga de oro", "Cotorra", "La apartada", "Lorica", "Los cordobas", "Momil", "Monitos", "Montelibano", "Monteria", "Planeta rica", "Pueblo nuevo", "Puerto escondido", "Puerto libertador", "Purisima", "Sahagun", "San andres de sotavento", "San antero", "San bernardo del viento", "San carlos", "San pelayo", "Tierralta", "Valencia"],
            "Cundinamarca": ["Agua de dios", "Alban", "Anapoima", "Anolaima", "Apulo", "Arbelaez", "Beltran", "Bituima", "Bogota", "Bojaca", "Cabrera", "Cachipay", "Cajica", "Caparrapi", "Caqueza", "Carmen de carupa", "Chaguani", "Chia", "Chipaque", "Choachi", "Choconta", "Cogua", "Cota", "Cucunuba", "El colegio", "El penon", "El rosal", "Facatativa", "Fomeque", "Fosca", "Funza", "Fuquene", "Fusagasuga", "Gachala", "Gachancipa", "Gacheta", "Gama", "Girardot", "Granada", "Guacheta", "Guaduas", "Guasca", "Guataqui", "Guatavita", "Guayabal de siquima", "Guayabetal", "Gutierrez", "Jerusalen", "Junin", "La calera", "La mesa", "La palma", "La pena", "La vega", "Lenguazaque", "Macheta", "Madrid", "Manta", "Medina", "Mosquera", "Narino", "Nemocon", "Nilo", "Nimaima", "Nocaima", "Pacho", "Paime", "Pandi", "Paratebueno", "Pasca", "Puerto salgar", "Puli", "Quebradanegra", "Quetame", "Quipile", "Ricaurte", "San antonio de tequendama", "San bernardo", "San cayetano", "San francisco", "San juan de rioseco", "Sasaima", "Sesquile", "Sibate", "Silvania", "Simijaca", "Soacha", "Sopo", "Subachoque", "Suesca", "Supata", "Susa", "Sutatausa", "Tabio", "Tausa", "Tena", "Tenjo", "Tibacuy", "Tibirita", "Tocaima", "Tocancipa", "Topaipi", "Ubala", "Ubaque", "Ubate", "Une", "Utica", "Venecia", "Vergara", "Viani", "Villagomez", "Villapinzon", "Villeta", "Viota", "Yacopi", "Zipacon", "Zipaquira"],
            "Guainía": ["Barranco mina", "Cacahual", "Inirida", "La guadalupe", "Mapiripana", "Morichal", "Pana-pana", "Puerto colombia", "San felipe"],
            "Guajira": ["Albania", "Barrancas", "Dibulla", "Distraccion", "El molino", "Fonseca", "Hato nuevo", "La jagua del pilar", "Maicao", "Manaure", "Riohacha", "San juan del cesar", "Uribia", "Urumita", "Villanueva"],
            "Guaviare": ["Calamar", "El retorno", "Miraflores", "San jose del guaviare"],
            "Huila": ["Acevedo", "Agrado", "Aipe", "Algeciras", "Altamira", "Baraya", "Campoalegre", "Colombia", "Elias", "Garzon", "Gigante", "Guadalupe", "Hobo", "Iquira", "Isnos", "La argentina", "La plata", "Nataga", "Neiva", "Oporapa", "Paicol", "Palermo", "Palestina", "Pital", "Pitalito", "Rivera", "Saladoblanco", "San agustin", "Santa maria", "Suaza", "Tarqui", "Tello", "Teruel", "Tesalia", "Timana", "Villavieja", "Yaguara"],
            "Magdalena": ["Algarrobo", "Aracataca", "Ariguani", "Cerro de san antonio", "Chivolo", "Cienaga", "Concordia", "El banco", "El pinon", "El reten", "Fundacion", "Guamal", "Nueva granada", "Pedraza", "Pijino del carmen", "Pivijay", "Plato", "Puebloviejo", "Remolino", "Sabanas de san angel", "Salamina", "San sebastian de buenavista", "San zenon", "Santa ana", "Santa barbara de pinto", "Santa marta", "Sitionuevo", "Tenerife", "Zapayan", "Zona bananera"],
            "Meta": ["Acacias", "Barranca de upia", "Cabuyaro", "Castilla la nueva", "Cubarral", "Cumaral", "El calvario", "El castillo", "El dorado", "Fuente de oro", "Granada", "Guamal", "La macarena", "Lejanias", "Mapiripan", "Mesetas", "Puerto concordia", "Puerto gaitan", "Puerto lleras", "Puerto lopez", "Puerto rico", "Restrepo", "San carlos de guaroa", "San juan de arama", "San juanito", "San martin", "Uribe", "Villavicencio", "Vistahermosa"],
            "Nariño": ["Alban", "Aldana", "Ancuya", "Arboleda", "Barbacoas", "Belen", "Buesaco", "Chachagui", "Colon (genova)", "Consaca", "Contadero", "Cordoba", "Cuaspud", "Cumbal", "Cumbitara", "El charco", "El penol", "El rosario", "El tablon", "El tambo", "Francisco pizarro", "Funes", "Guachucal", "Guaitarilla", "Gualmatan", "Iles", "Imues", "Ipiales", "La cruz", "La florida", "La llanada", "La tola", "La union", "Leiva", "Linares", "Los andes", "Magui Payan", "Mallama", "Mosquera", "Narino", "Olaya herrera", "Ospina", "Pasto", "Policarpa", "Potosi", "Providencia", "Puerres", "Pupiales", "Ricaurte", "Roberto payan", "Samaniego", "San bernardo", "San lorenzo", "San pablo", "San pedro de cartago", "Sandona", "Santa barbara", "Santa cruz", "Sapuyes", "Taminango", "Tangua", "Tumaco", "Tuquerres", "Yacuanquer"],
            "Norte de Santander": ["Abrego", "Arboledas", "Bochalema", "Bucarasica", "Cachira", "Cacota", "Chinacota", "Chitaga", "Convencion", "Cucuta", "Cucutilla", "Durania", "El carmen", "El tarra", "El zulia", "Gramalote", "Hacari", "Herran", "La esperanza", "La playa", "Labateca", "Los patios", "Lourdes", "Mutiscua", "Ocana", "Pamplona", "Pamplonita", "Puerto santander", "Ragonvalia", "Salazar", "San calixto", "San cayetano", "Santiago", "Sardinata", "Silos", "Teorama", "Tibu", "Toledo", "Villa caro", "Villa del rosario"],
            "Putumayo": ["Colon", "Mocoa", "Orito", "Puerto asis", "Puerto caicedo", "Puerto guzman", "Puerto leguizamo", "San francisco", "San miguel", "Santiago", "Sibundoy", "Valle del guamuez", "Villagarzon"],
            "Quindío": ["Armenia", "Buenavista", "Calarca", "Circasia", "Cordoba", "Filandia", "Genova", "La tebaida", "Montenegro", "Pijao", "Quimbaya", "Salento"],
            "Risaralda": ["Apia", "Balboa", "Belen de umbria", "Dosquebradas", "Guatica", "La celia", "La virginia", "Marsella", "Mistrato", "Pereira", "Pueblo rico", "Quinchia", "Santa rosa de cabal", "Santuario"],
            "San Andrés y Providencia": ["Providencia y santa catalina", "San andres"],
            "Santander": ["Aguada", "Albania", "Aratoca", "Barbosa", "Barichara", "Barrancabermeja", "Betulia", "Bolivar", "Bucaramanga", "Cabrera", "California", "Capitanejo", "Carcasi", "Cepita", "Cerrito", "Charala", "Charta", "Chima", "Chipata", "Cimitarra", "Concepcion", "Confines", "Contratacion", "Coromoro", "Curiti", "El carmen", "El guacamayo", "El penon", "El playon", "Encino", "Enciso", "Florian", "Floridablanca", "Galan", "Gambita", "Giron", "Guaca", "Guadalupe", "Guapota", "Guavata", "Guepsa", "Hato", "Jesus maria", "Jordan", "La belleza", "La paz", "Landazuri", "Lebrija", "Los santos", "Macaravita", "Malaga", "Matanza", "Mogotes", "Molagavita", "Ocamonte", "Oiba", "Onzaga", "Palmar", "Palmas del socorro", "Paramo", "Piedecuesta", "Pinchote", "Puente nacional", "Puerto parra", "Puerto wilches", "Rionegro", "Sabana de torres", "San andres", "San benito", "San gil", "San joaquin", "San jose de miranda", "San miguel", "San vicente de chucuri", "Santa barbara", "Santa helena del opon", "Simacota", "Socorro", "Suaita", "Sucre", "Surata", "Tona", "Valle de san jose", "Velez", "Vetas", "Villanueva", "Zapatoca"],
            "Sucre": ["Buenavista", "Caimito", "Chalan", "Coloso", "Corozal", "Covenas", "El roble", "Galeras", "Guaranda", "La union", "Los palmitos", "Majagual", "Morroa", "Ovejas", "Palmito", "Sampues", "San benito abad", "San juan de betulia", "San marcos", "San onofre", "San pedro", "Since", "Sincelejo", "Sucre", "Tolu", "Toluviejo"],
            "Tolima": ["Alpujarra", "Alvarado", "Ambalema", "Anzoategui", "Armero", "Ataco", "Cajamarca", "Carmen de apicala", "Casabianca", "Chaparral", "Coello", "Coyaima", "Cunday", "Dolores", "Espinal", "Falan", "Flandes", "Fresno", "Guamo", "Herveo", "Honda", "Ibague", "Icononzo", "Lerida", "Libano", "Mariquita", "Melgar", "Murillo", "Natagaima", "Ortega", "Palocabildo", "Piedras", "Planadas", "Prado", "Purificacion", "Rioblanco", "Roncesvalles", "Rovira", "Saldana", "San antonio", "San luis", "Santa isabel", "Suarez", "Valle de san juan", "Venadillo", "Villahermosa", "Villarrica"],
            "Valle del Cauca": ["Alcala", "Andalucia", "Ansermanuevo", "Argelia", "Bolivar", "Buenaventura", "Buga", "Bugalagrande", "Caicedonia", "Cali", "Calima", "Candelaria", "Cartago", "Dagua", "El aguila", "El cairo", "El cerrito", "El dovio", "Florida", "Ginebra", "Guacari", "Jamundi", "La cumbre", "La union", "La victoria", "Obando", "Palmira", "Pradera", "Restrepo", "Riofrio", "Roldanillo", "San pedro", "Sevilla", "Toro", "Trujillo", "Tulua", "Ulloa", "Versalles", "Vijes", "Yotoco", "Yumbo", "Zarzal"],
            "Vaupés": ["Caruru", "Mitu", "Pacoa", "Papunaua", "Taraira", "Yavarate"],
            "Vichada": ["Cumaribo", "La primavera", "Puerto carreno", "Santa rosalia"],
        }
    };

    // Evento para cargar departamentos
    paisSelect.addEventListener('change', function () {
        const pais = this.value;
        departamentoSelect.innerHTML = '<option value="">Seleccione un departamento</option>';
        ciudadSelect.innerHTML = '<option value="">Seleccione una ciudad</option>';

        if (departamentosYciudades[pais]) {
            Object.keys(departamentosYciudades[pais]).sort().forEach(departamento => {
                const option = new Option(departamento, departamento);
                departamentoSelect.add(option);
            });
        }
    });

    // Evento para cargar ciudades
    departamentoSelect.addEventListener('change', function () {
        const pais = paisSelect.value;
        const departamento = this.value;
        ciudadSelect.innerHTML = '<option value="">Seleccione una ciudad</option>';

        if (departamentosYciudades[pais] && departamentosYciudades[pais][departamento]) {
            departamentosYciudades[pais][departamento].sort().forEach(ciudad => {
                const option = new Option(ciudad, ciudad);
                ciudadSelect.add(option);
            });
        }
    });
});

// Validaciones bootstrap
document.addEventListener('DOMContentLoaded', function () {
    var forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
});