import InputField from "../../input/InputField";

function CredentialsForm ({credential,handleChangeCredential}:{credential:any,handleChangeCredential:any}) {
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
                    name="password"
                    label="Contrasena"
                    value={credential.password}
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
