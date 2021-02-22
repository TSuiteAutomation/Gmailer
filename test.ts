import { MailListener } from "./mailListener";

describe("Read email from gmail using imap", function () {
    let mailListener = new MailListener();


    it("Test email recieved", function () {
        mailListener.init();
        console.log("Test");
        mailListener.getLinkFromEmail().then(urlFromEmail => {
            console.log(urlFromEmail);
            expect(urlFromEmail).toEqual("Test");
        });
        mailListener.close();
        /*Perform some action on UI that triggers email.(Just for example im doing it)*/
        // element(by.id("email")).sendKeys("email@gmail.com");
        // element(by.buttonText("Send Email")).click();

        // expect(urlFromEmail).toEqual("Test");
    })
});


