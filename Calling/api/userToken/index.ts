import { AzureFunction, Context, HttpRequest } from "@azure/functions";
const { CommunicationIdentityClient } = require('@azure/communication-identity');

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const connectionString = process.env.ACS_CONNECTION_STRING;

    const tokenClient = new CommunicationIdentityClient(connectionString);
    const user = await tokenClient.createUser();
    const userToken = await tokenClient.issueToken(user, ["voip"]);

    context.res = {
        body: {
            value: {
                expiresOn: userToken.expiresOn,
                token: userToken.token,
                user: {
                    id: user.communicationUserId
                }
            }
        }
    };
};

export default httpTrigger;