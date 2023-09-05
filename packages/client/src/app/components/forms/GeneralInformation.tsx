import { TypeIdentification } from '@/lib/utils/thirds/enumThirds';
import React, { useState, useEffect } from 'react';

   

function GeneralInformaation (){

    const [generalInformaation, ] = useState<FormData>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Lógica al enviar el formulario
    };


    return (
        <div>
            <h1>INFORMACIÓN GENERAL</h1>
            <form onSubmit={handleSubmit}>
                {/* Tipo de Identificación */}
                <div className="mb-3">
                    <label className="form-label">Tipo de Identificación</label>
                    <select name="typeIdentification" className="form-select" value={data.typeIdentification} onChange={handleChange}>
                        <option value={TypeIdentification.CEDULA_DE_CIUDADANIA}>Cédula de Ciudadanía</option>
                        <option value={TypeIdentification.TARJETA_DE_EXTRANJERIA}>Tarjeta de Extranjería</option>
                    </select>
                </div>

                {/* Fecha de Expedicion */}
                <div className="mb-3">
                    <label className="form-label">Fecha de Expedición</label>
                    <input type="date" name="expeditionDate" className="form-control" value={data.expeditionDate?.toISOString().substr(0, 10) || ''} onChange={handleChange} />
                </div>

                {/* Ciudad de Expedición */}
                <div className="mb-3">
                    <label className="form-label">Ciudad de Expedición</label>
                    <input type="text" name="expeditionCity" className="form-control" value={data.expeditionCity} onChange={handleChange} />
                </div>

                {/* País de la Tarjeta */}
                <div className="mb-3">
                    <label className="form-label">País de la Tarjeta</label>
                    <input type="text" name="countryCard" className="form-control" value={data.countryCard} onChange={handleChange} />
                </div>

                {/* Municipalidad de la Tarjeta */}
                <div className="mb-3">
                    <label className="form-label">Municipalidad de la Tarjeta</label>
                    <input type="text" name="municipalityCard" className="form-control" value={data.municipalityCard} onChange={handleChange} />
                </div>

                {/* Ciudad de la Tarjeta */}
                <div className="mb-3">
                    <label className="form-label">Ciudad de la Tarjeta</label>
                    <input type="text" name="cityCard" className="form-control" value={data.cityCard} onChange={handleChange} />
                </div>

                {/* Nombre */}
                <div className="mb-3">
                    <label className="form-label">Nombres Completos</label>
                    <input type="text" name="name" className="form-control" value={data.name} onChange={handleChange} />
                </div>

                {/* Apellido */}
                <div className="mb-3">
                    <label className="form-label">Apellidos Completos</label>
                    <input type="text" name="lastName" className="form-control" value={data.lastName} onChange={handleChange} />
                </div>

                {/* Género */}
                <div className="mb-3">
                    <label className="form-label">Género</label>
                    <select name="gender" className="form-select" value={data.gender} onChange={handleChange}>
                        <option value={Gender.MASCULINO}>Masculino</option>
                        <option value={Gender.FEMENINO}>Femenino</option>
                    </select>
                </div>

                {/* Estado Civil */}
                <div className="mb-3">
                    <label className="form-label">Estado Civil</label>
                    <select name="statusCivil" className="form-select" value={data.statusCivil} onChange={handleChange}>
                        <option value={CivilStatus.SOLTERO_A}>Soltero(a)</option>
                        <option value={CivilStatus.CASADO_A}>Casado(a)</option>
                        <option value={CivilStatus.LIBRE}>Libre</option>
                        <option value={CivilStatus.OTRO}>Otro</option>
                        <option value={CivilStatus.MUJER_CABEZA_FAMILIA}>Mujer Cabeza de Familia</option>
                    </select>
                </div>

                {/* Dirección de Residencia */}
                <div className="mb-3">
                    <label className="form-label">Dirección de Residencia</label>
                    <input type="text" name="addressResidence" className="form-control" value={data.addressResidence} onChange={handleChange} />
                </div>

                {/* Ciudad*/}
                <div className="mb-3">
                    <label className="form-label">Ciudad</label>
                    <input type="text" name="municipality" className="form-control" value={data.municipality} onChange={handleChange} />
                </div>

                {/* Departamento */}
                <div className="mb-3">
                    <label className="form-label">Departamento</label>
                    <input type="text" name="city" className="form-control" value={data.city} onChange={handleChange} />
                </div>

                {/* Correo Personal */}
                <div className="mb-3">
                    <label className="form-label">Correo Personal</label>
                    <input type="email" name="email" className="form-control" value={data.email} onChange={handleChange} />
                </div>

                {/* Celular*/}
                <div className="mb-3">
                    <label className="form-label">Celular</label>
                    <input type="tel" name="phone" className="form-control" value={data.phone.toString()} onChange={handleChange} />
                </div>

                {/* Teléfono Fijo */}
                <div className="mb-3">
                    <label className="form-label">Teléfono Fijo</label>
                    <input type="tel" name="landLine" className="form-control" value={data.landLine.toString()} onChange={handleChange} />
                </div>

                {/* Tipo de Vivienda */}
                <div className="mb-3">
                    <label className="form-label">Tipo de Vivienda</label>
                    <select name="housingType" className="form-select" value={data.housingType} onChange={handleChange}>
                        <option value={HousingType.PROPIA}>Propia</option>
                        <option value={HousingType.ARRENDADA}>Arrendada</option>
                        <option value={HousingType.FAMILIAR}>Familiar</option>
                        <option value={HousingType.OTRO}>Otro</option>
                    </select>
                </div>

                {/* Estudios */}
                <div className="mb-3">
                    <label className="form-label">Estudios</label>
                    <select name="studies" className="form-select" value={data.studies} onChange={handleChange}>
                        <option value={Studies.PRIMARIA}>Primaria</option>
                        <option value={Studies.SECUNDARIA}>Secundaria</option>
                        <option value={Studies.TECNOLOGIA}>Tecnología</option>
                        <option value={Studies.UNIVESITARIA}>Universitaria</option>
                        <option value={Studies.POSGRADO}>Posgrado</option>
                    </select>
                </div>

                {/* Profesión */}
                <div className="mb-3">
                    <label className="form-label">Profesión</label>
                    <input type="text" name="profession" className="form-control" value={data.profession} onChange={handleChange} />
                </div>

                {/* Operaciones Exteriores */}
                <div className="mb-3">
                    <label className="form-check-label">¿Realiza operaciones en el exterior?</label>
                    <input type="checkbox" name="foreignOperations" className="form-check-input" checked={data.foreignOperations} onChange={handleChange} />
                </div>

                {/* Recursos Públicos */}
                <div className="mb-3">
                    <label className="form-check-label">¿Accede a recursos públicos?</label>
                    <input type="checkbox" name="publicResources" className="form-check-input" checked={data.publicResources} onChange={handleChange} />
                </div>

                {/* Reconocimiento Público */}
                <div className="mb-3">
                    <label className="form-check-label">¿Tiene reconocimiento público?</label>
                    <input type="checkbox" name="publicRecognition" className="form-check-input" checked={data.publicRecognition} onChange={handleChange} />
                </div>

                {/* Poder Público */}
                <div className="mb-3">
                    <label className="form-check-label">¿Posee poder público?</label>
                    <input type="checkbox" name="publicPower" className="form-check-input" checked={data.publicPower} onChange={handleChange} />
                </div>


                {/* Botón de Envío */}
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    );
}

export default GeneralInformaation;
