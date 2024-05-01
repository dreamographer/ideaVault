import { User as UserModel } from "../model/user.js";
import jwt from "jsonwebtoken";
const CLIENT_URL = process.env.CLIENT_URL;
export const authController = {
  handlePassportCallback: async function (req, res) {
    try {
      if (req && req.user) {
        const user = req.user;
        const email = user.emails[0].value;
        const existingUser = await UserModel.findOne({ email: email });
        let refreshToken;
        let accessToken;
        if (existingUser && existingUser._id) {
          refreshToken = jwt.sign(
            {
              username: existingUser.fullname,
              userId: existingUser._id.toString(),
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
          );
        } else {
          const data = {
            fullname: user.displayName,
            email: email,
            profile: user.photos[0].value,
          };
          const resp = await UserModel.create(data);
          if (resp && resp.id) {
            accessToken = jwt.sign(
              {
                username: resp.fullname,
                userId: resp._id.toString(),
              },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "10m",
              }
            );

            refreshToken = jwt.sign(
              {
                username: resp.fullname,
                userId: resp._id.toString(),
              },
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: "1d" }
            );
          }
        }
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        return res.redirect(`${CLIENT_URL}/dashboard`);
      }
    } catch (error) {
      console.log(error); 
    }
  },
  generateToken: async function (req, res) {
    try {
      let accessToken;
      const token = req.cookies.jwt;
      if(!token){
        return res.json(null);
      }
      const data = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    
      if (!data.userId) {
        return res.json(null);
      } else {
        const userId = data.userId;
        const existingUser = await UserModel.findOne({ _id: userId });
        accessToken = jwt.sign(
          {
            username: existingUser.fullname,
            userId: existingUser._id.toString(),
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "10m",
          }
        );
        return res.json({ accessToken });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
