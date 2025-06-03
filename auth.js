const passport=require("passport")
const OAuth2=require("passport-oauth2")
const axios=require("axios")
const CLIENT_ID='2eaead4a-37cc-4cc0-a047-f1fde64d2f2b'
const CLIENT_SECRET="9ba05d13-4a36-46a4-a039-94afacedf504"
const REDIRECT_URL=""
passport.use("hubspot",new OAuth2({
    authorizationURL:'https://app.hubspot.com/oauth/authorize',
    tokenURL:'https://api.hubapi.com/oauth/v1/token',
    clientID:CLIENT_ID,
    clientSecret:CLIENT_SECRET,
    callbackURL:"http://localhost:3000/callback",
    scope:'crm.objects.contacts.read'
},async(accessToken,refreshToken,Profiler,done)=>{
    try {
        const res=await axios.get(`https://api.hubapi.com/oauth/v1/access-tokens/${accessToken}`)
        const userInfo=res.data
        const user={
            email: userInfo.user,
            userId: userInfo.user_id,
            hubId: userInfo.hub_id
        }
        return done(null,user)
    } catch (error) {
        return done(error)
    }
}))
passport.serializeUser((user,done)=>done(null,user))
passport.deserializeUser((obj,done)=>done(null,obj))
module.exports = passport;