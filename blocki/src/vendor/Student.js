export class Student {
    studentRootFolderId = "";

    constructor(canvasJson, baseUrl, accessToken) {
        this.id = canvasJson.id;
        this.firstName = canvasJson.first_name;
        this.lastName = canvasJson.last_name;
        this.shortName = canvasJson.short_name || null;
        this.courses = [];
        this.baseUrl = baseUrl; // because it's in Canvas.js
        this.studentAccessToken = accessToken;
    }

    /**
     * Associates the access token with the student instance.
     * Should be encrypted and stored securely later on.
     * Although I'M NOT SURE IF THIS IS A GOOD IDEA BC ITS ALREADY IN CANVASSERVICE
     */
    SetAccessToken(token) {
        if (typeof token !== 'string' || !token.trim()) {
            throw new Error("Invalid access token");
        }
        this.studentAccessToken = token;
    }

    async FetchUserId() {
        const res = await fetch(`${this.baseUrl}/api/v1/users/self`, {
            headers: { Authorization: `Bearer ${this.studentAccessToken}` },
        });
        if (!res.ok) throw new Error(`Failed to fetch user info: ${res.status}`);
        const userData = await res.json();
        return userData.id;
    }

    GetFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    GetShortName() {
        return this.shortName || `${this.firstName} ${this.lastName}`;
    }
}