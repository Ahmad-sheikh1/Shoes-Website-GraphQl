const ShoesData = require("./ShoesDataDB");
const Pend_Order = require("./OrderDB");
const RegistrationModel = require("./Mongodb");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        getshoes: async () => {
            return await ShoesData.find();
        },
        getpending: async () => {
            return await Pend_Order.find();
        },
        getRegistrationResponse: async () => {
            return await RegistrationModel.find();
        }
    },
    Mutation: {
        AddRegistrationData: async (_, args) => {
            let regid = new RegistrationModel(args.inputdata);
            const savedRegData = await regid.save();
            return savedRegData;
        },
        AddPendingDBData: async (_, args) => {
            try {
                const { input } = args;
                const addedData = await Pend_Order.insertMany(input);
                console.log(addedData);
                return addedData
            } catch (error) {
                throw new Error(error.message);
            }
        },
        verifyToken: async (_, { token }) => {
            try {
                const decodedToken = jwt.verify(token, "thk ha samhaj gaya");
                const user = await RegistrationModel.findOne({ Email: decodedToken.Email, Password: decodedToken.Password });
                if (!user) {
                    throw new AuthenticationError('Invalid token');
                }
                return {
                    Email: user.Email,
                    Password: user.Password
                };;
            } catch (error) {
                throw new AuthenticationError('Invalid token');
            }
        },
        login: async (_, { input }) => {
            const loggedUser = await RegistrationModel.findOne({ Email: input.Email, Password: input.Password });
         
            if (loggedUser) {
                const token = jwt.sign({ Email: input.Email, Password: input.Password }, 'thk ha samhaj gaya', { expiresIn: '2d' });
                // console.log(token);
                return {
                    token,
                    loggedUser
                };
            } else {
                throw new AuthenticationError('User not found');
            }
        }
    }
}

module.exports = resolvers