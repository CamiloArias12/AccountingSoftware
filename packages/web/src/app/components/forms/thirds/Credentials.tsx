import { FormCredential } from "@/app/hooks/thirds/CredentialInput";
import InputField from "../../input/InputField";

function CredentialsForm () {
      const {credential,handleChangeCredential}= FormCredential()
  return (
      <div className=" flex-grow grid grid-cols-4 gap-4">
	        <InputField
                    type="text"
                    name="username"
                    label="Usuario"
                    value={credential.username}
                    onChange={handleChangeCredential}
                />

                <InputField
                    type="password"
                    name="passwd"
                    label="Contrasena"
                    value={credential.passwd}
                    onChange={handleChangeCredential}
                />
	       <InputField
                    type="password"
                    label="Repetir contrasena"
                />


      </div>
  ); 
}


export default CredentialsForm;
