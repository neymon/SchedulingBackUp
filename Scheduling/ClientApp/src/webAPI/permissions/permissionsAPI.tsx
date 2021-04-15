
interface IPermissionList {
	permissionList: string[]
}

export default async function getPermissions(token: string ): Promise<IPermissionList> {
	const res = await fetch('https://localhost:44338/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify( {
        query: `
          query{
              permissionList{
              name
            }
          }
        `
      })
    });

    const{ data, errors}  = await res.json();

    console.log(data);

    let permissions = [];
    if(!errors){
      permissions = data.permissionList.map((permission: any) => permission.name)
    }


    return {
        permissionList: permissions
    }

}
