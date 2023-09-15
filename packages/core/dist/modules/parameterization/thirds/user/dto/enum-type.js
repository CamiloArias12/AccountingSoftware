"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Studies = exports.HousingType = exports.Gender = exports.CivilStatus = exports.TypeIdentification = void 0;
var TypeIdentification;
(function (TypeIdentification) {
    TypeIdentification["CEDULA_DE_CIUDADANIA"] = "cedula de ciudadania";
    TypeIdentification["TARJETA_DE_EXTRANJERIA"] = "cedula de extranjeria";
})(TypeIdentification || (exports.TypeIdentification = TypeIdentification = {}));
var CivilStatus;
(function (CivilStatus) {
    CivilStatus["SOLTERO_A"] = "soltero(a)";
    CivilStatus["CASADO_A"] = "casado(a)";
    CivilStatus["LIBRE"] = "libre";
    CivilStatus["OTRO"] = "otro";
    CivilStatus["MUJER_CABEZA_FAMILIA"] = "mujer cabeza familia";
})(CivilStatus || (exports.CivilStatus = CivilStatus = {}));
var Gender;
(function (Gender) {
    Gender["MASCULINO"] = "masculino";
    Gender["FEMENINO"] = "femenino";
})(Gender || (exports.Gender = Gender = {}));
var HousingType;
(function (HousingType) {
    HousingType["PROPIA"] = "propia";
    HousingType["ARRENDADA"] = "arrendada";
    HousingType["FAMILIAR"] = "familiar";
    HousingType["OTRO"] = "otro";
})(HousingType || (exports.HousingType = HousingType = {}));
var Studies;
(function (Studies) {
    Studies["PRIMARIA"] = "primaria";
    Studies["SECUNDARIA"] = "secundaria";
    Studies["TECNOLOGIA"] = "tecnologia";
    Studies["UNIVESITARIA"] = "universitaria";
    Studies["POSGRADO"] = "posgrado";
})(Studies || (exports.Studies = Studies = {}));
//# sourceMappingURL=enum-type.js.map