import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import { IUser } from "../models/types";
import { UserModel } from "../models/user";
import { IControllers } from "./types";

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const verifyToken = async (token: string) => {
  try {
    return (
      await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      })
    ).getPayload();
  } catch (err) {
    throw new Error("verify token error");
  }
};

const returnUser = (user: IUser) => {
  return { name: user.name, image: user.image, id: user._id };
};

export const AuthControllers = {
  postSignUp: async (req, res) => {
    const { credential, email, password, confirmPassword, name } = req.body;

    let profile;
    if (credential) {
      const googleResponse = await verifyToken(credential);
      profile = {
        email: googleResponse?.email,
        name: googleResponse?.name,
        image: googleResponse?.picture,
        sub: googleResponse?.sub,
      };
    } else if (email && password) {
      profile = { email, password: bcrypt.hashSync(password, 12), name };
    } else {
      return res.status(400).json({ mess: "Invalid token or form data" });
    }

    const user = await UserModel.findOne({ email: profile?.email });
    if (user) return res.status(409).json({ mess: "User already exist" });

    if (password !== confirmPassword)
      return res.status(400).json({ mess: "Confirm password failed" });

    const newUser = await UserModel.create(profile);
    newUser.save();

    res.status(200).json({
      user: returnUser(newUser),
      token: jwt.sign(
        { email: newUser.email, id: newUser._id },
        process.env.REACT_APP_JWT_SECRET!,
        { expiresIn: "1h" }
      ),
    });
  },

  postSignIn: async (req, res) => {
    const { credential, email, password } = req.body;

    let user;
    if (credential) {
      const { email } = jwtDecode<Record<string, string>>(credential);
      user = await UserModel.findOne({ email: email });
    } else {
      user = await UserModel.findOne({ email: email });
    }

    if (!user) return res.status(404).json({ mess: "User not exist" });

    if (user.password) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect)
        return res.status(401).json({ mess: "Uncorrect password" });
    }

    res.status(200).json({
      user: returnUser(user),
      token: jwt.sign(
        { email: user.email, id: user.id },
        process.env.REACT_APP_JWT_SECRET!,
        { expiresIn: "1h" }
      ),
    });
  },
} satisfies IControllers;

// export const signUp = async (req, res) => {
//   const { credential, email, password, confirmPassword, name } = req.body;

//   let profile;
//   if (credential) {
//     const googleResponse = await verifyToken(credential);
//     profile = {
//       email: googleResponse?.email,
//       name: googleResponse?.name,
//       image: googleResponse?.picture,
//       sub: googleResponse?.sub,
//     };
//   } else if (email && password) {
//     profile = { email, password: bcrypt.hashSync(password, 12), name };
//   } else {
//     return res.status(400).json({ mess: "Invalid token or form data" });
//   }

//   const user = await UserModel.findOne({ email: profile?.email });
//   if (user) return res.status(409).json({ mess: "User already exist" });

//   if (password !== confirmPassword)
//     return res.status(400).json({ mess: "Confirm password failed" });

//   const newUser = await UserModel.create(profile);
//   newUser.save();

//   res.status(200).json({
//     user: returnUser(newUser),
//     token: jwt.sign(
//       { email: newUser.email, id: newUser._id },
//       process.env.REACT_APP_JWT_SECRET!,
//       { expiresIn: "1h" }
//     ),
//   });
// };

// export const signIn = async (req, res) => {
//   const { credential, email, password } = req.body;

//   let user;
//   if (credential) {
//     const { email } = jwtDecode<Record<string, string>>(credential);
//     user = await UserModel.findOne({ email: email });
//   } else {
//     user = await UserModel.findOne({ email: email });
//   }

//   if (!user) return res.status(404).json({ mess: "User not exist" });

//   if (user.password) {
//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect)
//       return res.status(401).json({ mess: "Uncorrect password" });
//   }

//   res.status(200).json({
//     user: returnUser(user),
//     token: jwt.sign(
//       { email: user.email, id: user.id },
//       process.env.REACT_APP_JWT_SECRET!,
//       { expiresIn: "1h" }
//     ),
//   });
// };

// const { credential } = req.body;
// try {
//   const profile = await verifyToken(credential);
//   const user = await userModel.find({ email: profile?.email });
//   if (user) res.status(200).json({ mess: "sign in success", user: user[0] });
//   else res.status(404).json({ mess: "user not found" });
// } catch (err) {
//   res.json({ mess: err });
// }
