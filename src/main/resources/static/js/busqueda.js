document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const advancedSearchForm = document.querySelector('form[action="/vehiculos/resultados"]');

    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            buscarVehiculos();
        });
    }

    if (advancedSearchForm) {
        advancedSearchForm.addEventListener('submit', function (e) {
            // NO prevenir el submit - dejarlo funcionar normalmente
            // e.preventDefault();
            // buscarVehiculos(0, this);
        });
    }

    function buscarVehiculos(page = 0, form = searchForm) {
        const formData = new FormData(form);
        formData.append('page', page);

        const url = '/vehiculos/resultados?' + new URLSearchParams(formData);
        window.location.href = url;
    }

    // =====================================================
    // BÚSQUEDA JERÁRQUICA - PÁGINA SIMPLE (buscar.html)
    // =====================================================
    const marcaSimple = document.getElementById('marca');
    const modeloSimple = document.getElementById('modelo');
    const anioSimple = document.getElementById('anio');

    if (marcaSimple) {
        // Cuando cambia la MARCA
        marcaSimple.addEventListener('change', function () {
            const marca = this.value;
            
            // Limpiar modelo y año
            modeloSimple.innerHTML = '<option value="">Todos los modelos</option>';
            anioSimple.innerHTML = '<option value="">Todos los años</option>';
            
            if (!marca) {
                return;
            }

            // Cargar modelos filtrados por marca
            fetch(`/vehiculos/modelos-por-marca?marca=${encodeURIComponent(marca)}`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(modelo => {
                        modeloSimple.innerHTML += `<option value="${modelo}">${modelo}</option>`;
                    });
                })
                .catch(error => console.error('Error cargando modelos:', error));

            // Cargar años filtrados por marca
            fetch(`/vehiculos/anios-por-filtros?marca=${encodeURIComponent(marca)}`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(anio => {
                        anioSimple.innerHTML += `<option value="${anio}">${anio}</option>`;
                    });
                })
                .catch(error => console.error('Error cargando años:', error));
        });

        // Cuando cambia el MODELO (afecta años)
        if (modeloSimple) {
            modeloSimple.addEventListener('change', function () {
                const marca = marcaSimple.value;
                const modelo = this.value;
                
                // Limpiar años
                anioSimple.innerHTML = '<option value="">Todos los años</option>';
                
                if (!marca && !modelo) return;

                // Cargar años filtrados por marca Y modelo
                let url = '/vehiculos/anios-por-filtros?';
                if (marca) url += `marca=${encodeURIComponent(marca)}&`;
                if (modelo) url += `modelo=${encodeURIComponent(modelo)}`;
                
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(anio => {
                            anioSimple.innerHTML += `<option value="${anio}">${anio}</option>`;
                        });
                    })
                    .catch(error => console.error('Error:', error));
            });
        }
    }

    // =====================================================
    // BÚSQUEDA JERÁRQUICA - PÁGINA AVANZADA
    // =====================================================
    const marcaAvanzada = document.querySelector('select[name="marca"]');
    const modeloAvanzada = document.querySelector('select[name="modelo"]');
    const anioAvanzada = document.querySelector('select[name="anio"]');
    const generacionAvanzada = document.querySelector('select[name="generacion"]');
    const motorAvanzada = document.querySelector('select[name="motor"]');
    const combustibleAvanzada = document.querySelector('select[name="tipo_combustible"]');
    const traccionAvanzada = document.querySelector('select[name="tipo_traccion"]');
    const carroceriaAvanzada = document.querySelector('select[name="tipo_carroceria"]');
    const plazasAvanzada = document.querySelector('select[name="numero_plazas"]');

    if (marcaAvanzada) {
        // Cuando cambia la MARCA
        marcaAvanzada.addEventListener('change', function () {
            const marca = this.value;
            
            // Limpiar todos los selectores dependientes
            limpiarSelectoresDependientes();
            
            if (!marca) return;

            // Cargar modelos por marca
            fetch(`/vehiculos/modelos-por-marca?marca=${encodeURIComponent(marca)}`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(modelo => {
                        modeloAvanzada.innerHTML += `<option value="${modelo}">${modelo}</option>`;
                    });
                })
                .catch(error => console.error('Error:', error));

            // Cargar otros filtros basados en marca
            cargarFiltrosPorSeleccion();
        });

        // Cuando cambia el MODELO
        if (modeloAvanzada) {
            modeloAvanzada.addEventListener('change', function () {
                const marca = marcaAvanzada.value;
                const modelo = this.value;
                
                // Limpiar selectores posteriores
                if (anioAvanzada) anioAvanzada.innerHTML = '<option value="">Todos los años</option>';
                if (generacionAvanzada) generacionAvanzada.innerHTML = '<option value="">Todas las generaciones</option>';
                if (motorAvanzada) motorAvanzada.innerHTML = '<option value="">Todos los motores</option>';
                
                cargarFiltrosPorSeleccion();
            });
        }

        // Cuando cambia el AÑO
        if (anioAvanzada) {
            anioAvanzada.addEventListener('change', function () {
                cargarFiltrosPorSeleccion();
            });
        }

        // Función para cargar todos los filtros según la selección actual
        function cargarFiltrosPorSeleccion() {
            const marca = marcaAvanzada ? marcaAvanzada.value : null;
            const modelo = modeloAvanzada ? modeloAvanzada.value : null;
            const anio = anioAvanzada ? anioAvanzada.value : null;

            let params = '';
            if (marca) params += `marca=${encodeURIComponent(marca)}&`;
            if (modelo) params += `modelo=${encodeURIComponent(modelo)}&`;
            if (anio) params += `anio=${encodeURIComponent(anio)}`;

            // Cargar AÑOS
            if (anioAvanzada) {
                fetch(`/vehiculos/anios-por-filtros?${params}`)
                    .then(response => response.json())
                    .then(data => {
                        const selectedAnio = anioAvanzada.value;
                        anioAvanzada.innerHTML = '<option value="">Todos los años</option>';
                        data.forEach(anio => {
                            const option = new Option(anio, anio, false, anio == selectedAnio);
                            anioAvanzada.add(option);
                        });
                    })
                    .catch(error => console.error('Error:', error));
            }

            // Cargar GENERACIONES
            if (generacionAvanzada) {
                fetch(`/vehiculos/generaciones-por-filtros?${params}`)
                    .then(response => response.json())
                    .then(data => {
                        generacionAvanzada.innerHTML = '<option value="">Todas las generaciones</option>';
                        data.forEach(gen => {
                            generacionAvanzada.innerHTML += `<option value="${gen}">${gen}</option>`;
                        });
                    })
                    .catch(error => console.error('Error:', error));
            }

            // Cargar MOTORES
            if (motorAvanzada) {
                fetch(`/vehiculos/motores-por-filtros?${params}`)
                    .then(response => response.json())
                    .then(data => {
                        motorAvanzada.innerHTML = '<option value="">Todos los motores</option>';
                        data.forEach(motor => {
                            motorAvanzada.innerHTML += `<option value="${motor}">${motor}</option>`;
                        });
                    })
                    .catch(error => console.error('Error:', error));
            }

            // Cargar COMBUSTIBLES
            if (combustibleAvanzada) {
                fetch(`/vehiculos/combustibles-por-filtros?${params}`)
                    .then(response => response.json())
                    .then(data => {
                        combustibleAvanzada.innerHTML = '<option value="">Todos los tipos de combustible</option>';
                        data.forEach(comb => {
                            combustibleAvanzada.innerHTML += `<option value="${comb}">${comb}</option>`;
                        });
                    })
                    .catch(error => console.error('Error:', error));
            }

            // Cargar TRACCIONES
            if (traccionAvanzada) {
                fetch(`/vehiculos/tracciones-por-filtros?${params}`)
                    .then(response => response.json())
                    .then(data => {
                        traccionAvanzada.innerHTML = '<option value="">Todos los tipos de tracción</option>';
                        data.forEach(trac => {
                            traccionAvanzada.innerHTML += `<option value="${trac}">${trac}</option>`;
                        });
                    })
                    .catch(error => console.error('Error:', error));
            }

            // Cargar CARROCERÍAS
            if (carroceriaAvanzada) {
                fetch(`/vehiculos/carrocerias-por-filtros?${params}`)
                    .then(response => response.json())
                    .then(data => {
                        carroceriaAvanzada.innerHTML = '<option value="">Todos los tipos de carrocería</option>';
                        data.forEach(carr => {
                            carroceriaAvanzada.innerHTML += `<option value="${carr}">${carr}</option>`;
                        });
                    })
                    .catch(error => console.error('Error:', error));
            }

            // Cargar PLAZAS
            if (plazasAvanzada) {
                fetch(`/vehiculos/plazas-por-filtros?${params}`)
                    .then(response => response.json())
                    .then(data => {
                        plazasAvanzada.innerHTML = '<option value="">Todos los números de plazas</option>';
                        data.forEach(plaza => {
                            plazasAvanzada.innerHTML += `<option value="${plaza}">${plaza}</option>`;
                        });
                    })
                    .catch(error => console.error('Error:', error));
            }
        }

        function limpiarSelectoresDependientes() {
            if (modeloAvanzada) modeloAvanzada.innerHTML = '<option value="">Todos los modelos</option>';
            if (anioAvanzada) anioAvanzada.innerHTML = '<option value="">Todos los años</option>';
            if (generacionAvanzada) generacionAvanzada.innerHTML = '<option value="">Todas las generaciones</option>';
            if (motorAvanzada) motorAvanzada.innerHTML = '<option value="">Todos los motores</option>';
            if (combustibleAvanzada) combustibleAvanzada.innerHTML = '<option value="">Todos los tipos de combustible</option>';
            if (traccionAvanzada) traccionAvanzada.innerHTML = '<option value="">Todos los tipos de tracción</option>';
            if (carroceriaAvanzada) carroceriaAvanzada.innerHTML = '<option value="">Todos los tipos de carrocería</option>';
            if (plazasAvanzada) plazasAvanzada.innerHTML = '<option value="">Todos los números de plazas</option>';
        }
    }
});

// Funcionalidad para el slider de consumo
document.addEventListener('DOMContentLoaded', function () {
    const consumoRange = document.getElementById('consumo_km_l');
    const consumoValue = document.getElementById('consumo_km_l_value');
    if (consumoRange && consumoValue) {
        consumoRange.addEventListener('input', function () {
            consumoValue.textContent = parseFloat(this.value).toFixed(3);
        });
    }
});

// Funcionalidad de autocompletado para la comparación de vehículos
document.addEventListener('DOMContentLoaded', function () {
    const searchInputs = document.querySelectorAll('.vehiculo-search');
    searchInputs.forEach(input => {
        input.addEventListener('input', function () {
            const query = this.value;
            const resultsDiv = this.nextElementSibling;
            if (query.length > 2) {
                fetch(`/vehiculos/buscar-sugerencias?query=${query}`)
                    .then(response => response.json())
                    .then(data => {
                        resultsDiv.innerHTML = '';
                        data.forEach(vehicle => {
                            const div = document.createElement('div');
                            div.textContent = `${vehicle.marca} ${vehicle.modelo} ${vehicle.anio} ${vehicle.motor}`;
                            div.addEventListener('click', () => selectVehicle(vehicle, input.closest('.compare-column')));
                            resultsDiv.appendChild(div);
                        });
                        resultsDiv.style.display = 'block';
                    });
            } else {
                resultsDiv.style.display = 'none';
            }
        });
    });

    function selectVehicle(vehicle, column) {
        fetch(`/vehiculos/${vehicle.idVehiculos}`)
            .then(response => response.json())
            .then(data => {
                column.querySelector('.marca').textContent = data.marca;
                column.querySelector('.modelo').textContent = data.modelo;
                column.querySelector('.anio').textContent = data.anio;
                column.querySelector('.generacion').textContent = data.generacion;
                column.querySelector('.motor').textContent = data.motor;
                column.querySelector('.tipo_combustible').textContent = data.tipoCombustible;
                column.querySelector('.consumo_km_l').textContent = data.consumoKmL;
                column.querySelector('.tipo_traccion').textContent = data.tipoTraccion;
                column.querySelector('.tipo_carroceria').textContent = data.tipoCarroceria;
                column.querySelector('.numero_plazas').textContent = data.numeroPlazas;
                column.querySelector('.card-img-top').src = data.rutaImagen;
                column.querySelector('.search-results').style.display = 'none';
            });
    }
});