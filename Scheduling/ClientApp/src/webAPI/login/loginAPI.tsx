
interface ICheckLogin {
	isValidInfo: boolean,
	token: string,
    permissions: string[]
}

export default async function checkLoginData(email: string, password: string): Promise<ICheckLogin> {
	const res = await fetch('https://localhost:44338/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        query: `
          mutation Login($email: String!,$password: String!){
          login(email: $email, password: $password){
            token,
            permissions,
            isValidInfo
          }
        }
        `,
        variables: { email, password}
      })
    });

    if(res.ok){
        const { data } = await res.json();

        return data.login;
    }

    return {
        isValidInfo: false,
        token: '',
        permissions: []
    }

}
