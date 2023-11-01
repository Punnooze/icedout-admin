
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  session:{
      strategy: "jwt",
      maxAge: 10*24*60*60,//30 days
  },
  providers:[
    CredentialsProvider({
        type:"credentials",
        credentials:{
            name:{
                label:"name",
                type:'name',
            },
            password:{
                label:"Password",
                type:"password"
            },
        },
        async authorize(credentials) {
            const credentialDetails = {
                name:credentials.name,
                password:credentials.password,
            }
          const resp = await fetch(process.env.NEXTAUTH_URL+'/api/login',{
              method:"POST",
              headers:{
                  Accept:"application/json",
                  "Content-Type":"application/json",
              },
              body: JSON.stringify(credentialDetails),
          });
          const res = await resp.json();
          if(res.success){
              return res.data
          }else{
              return null;
          }
      },
    }),
  ],
  callbacks:{
    jwt:async({token,user}) => {
        if(user){
            token._id = user._id;
            token.name = user.name;
            // token.accessToken = user.token;
        }

        return token;
    },
    session: ({session,token}) => {
        if(token){
            session.user._id = token._id;
            session.user.name = token.name;
            // session.user.accessToken = token.accessToken;
        }
        return session;
    }
},
pages:{
    signIn: '/'
}
}

const handler =  NextAuth(authOptions);

export {handler as GET, handler as POST}