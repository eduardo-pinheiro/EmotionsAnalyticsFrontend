export class Affectiva {

    private static onGoing = false;
    private static startDate: Date | false = false;
    private static detector: any;
    private static firstTime: boolean = true;

    //Hooks
    static onInitializeSuccess: Function;
    static onInitializeFailure: Function;
    static onWebcamConnectSuccess: Function;
    static onWebcamConnectFailure: Function;
    static onImageResultsSuccess: Function;
    static onStop: Function;

    static start() {

        if (!this.onGoing) {

            if (this.firstTime) {

                const script = document.createElement("script");
                script.src = "https://download.affectiva.com/js/3.2.1/affdex.js";
                script.async = true;
                script.addEventListener("load", () => this.startAffectiva());
                document.body.appendChild(script);

            } else {
                this.startAffectiva();
            }
        }
    }


    private static startAffectiva() {

        let nodeCanvasAffectiva;

        if (this.firstTime) {

            nodeCanvasAffectiva = document.createElement("div");
            nodeCanvasAffectiva.id = "nodeCanvasAffectiva";
            nodeCanvasAffectiva.style.display = "none";
            document.body.appendChild(nodeCanvasAffectiva);
            this.firstTime = false;

        } else {
            nodeCanvasAffectiva = document.getElementById("nodeCanvasAffectiva");
        }

        const width = 640;
        const height = 480;
        //@ts-ignore
        const faceMode = window.affdex.FaceDetectorMode.SMALL_FACES;

        //@ts-ignore
        const detector = new window.affdex.CameraDetector(nodeCanvasAffectiva, width, height, faceMode);
        this.detector = detector;
        this.detector.detectAllExpressions();
        this.detector.detectAllEmotions();
        this.detector.detectAllEmojis();
        this.detector.detectAllAppearance();

        this.detector.addEventListener("onInitializeSuccess", () => {
            if (this.onInitializeSuccess)
                this.onInitializeSuccess();
        });

        this.detector.addEventListener("onInitializeFailure", () => {
            if (this.onInitializeFailure)
                this.onInitializeFailure();
        });

        this.detector.addEventListener("onWebcamConnectSuccess", () => {
            if (this.onWebcamConnectSuccess)
                this.onWebcamConnectSuccess();
        });

        this.detector.addEventListener("onWebcamConnectFailure", () => {
            if (this.onInitializeFailure)
                this.onWebcamConnectFailure();
        });

        this.detector.addEventListener("onImageResultsSuccess", (faces: any, image: any) => {
            
            if (this.onGoing) {

                if (!this.startDate)
                    this.startDate = new Date();
    
                const currentDate = new Date();
                //@ts-ignore
                const timestamp = Math.abs(this.startDate - currentDate) / 1000;
    
                if (this.onImageResultsSuccess)
                    this.onImageResultsSuccess(faces, image, timestamp);
            }
        });

        this.detector.start();
        this.onGoing = true;
    }


    static stop() {

        if (this.onGoing) {

            this.startDate = false;
            this.onGoing = false;
            this.detector.stop();

            if (this.onStop)
                this.onStop();
        }
    }
}