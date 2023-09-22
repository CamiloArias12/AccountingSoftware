import { FormCredential } from "@/app/hooks/thirds/CredentialInput";
import InputField from "../../input/InputField";

function CredentialsForm () {
      const {credential,handleChangeCredential}= FormCredential()
  return (
      <>
	        <InputField
                    type="tel"
                    name="telefono"
                    label="Teléfono"
                    value={credential.username}
                    onChange={handleChangeCredential}
                />

                <InputField
                    type="email"
                    name="correoLaboral"
                    label="Correo Laboral"
                    value={credential.passwd}
                    onChange={handleChangeCredential}
                />

                <InputField
                    type="number"
                    name="sueldo"
                    label="Sueldo"
                    value={credential.passwdVerify}
                    onChange={handleChangeCredential}
                />
      </>
  ); 
}


export default CredentialsForm;
