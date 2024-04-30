import { User as UserModel } from "../model/user";  
  
  export const authController={
    handlePassportCallback: async function (req, res) {
    try {
      if (req && req.user) {
        const user = req.user
        const email = user.emails[0].value;
        const existingUser = await UserModel.findOne({ email: email });
        let token;
        if (existingUser && existingUser._id) {
          token = this.authService.generateToken(existingUser._id.toString());
        } else {
          const data = {
            fullname: user.displayName,
            email: email,
            profile: user.photos[0].value,
          };
          const resp = await UserModel.create(data);
          if (resp && resp.id) {
            token = this.authService.generateToken(resp.id.toString());
          }
        }
        if (token) {
          res.cookie("jwt", token.accessToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
          });
          res.cookie("refreshToken", token.refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
          });

          return res.redirect(`${CLIENT_URL}/dashboard`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  }
  
 