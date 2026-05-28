import admin from "firebase-admin";

const normalizePrivateKey = (privateKey = "") =>
  privateKey
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/\\n/g, "\n");

const getServiceAccount = () => {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

    return {
      ...serviceAccount,
      privateKey: normalizePrivateKey(serviceAccount.privateKey),
    };
  }

  if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    return {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY),
    };
  }

  return null;
};

const serviceAccount = getServiceAccount();
let firebaseAdminInitError = null;

if (!admin.apps.length) {
  if (serviceAccount) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } catch (error) {
      firebaseAdminInitError = error;
      console.warn(
        "Firebase Admin is not initialized. Check FIREBASE_PRIVATE_KEY formatting."
      );
      console.warn(error.message);
    }
  }
}

export const firebaseAdminAuth = admin.apps.length ? admin.auth() : null;
export const firebaseAdminErrorMessage = firebaseAdminInitError?.message || "";
