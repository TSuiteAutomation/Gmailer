import { resolveTxt } from "dns";

const MailListenerClient = require("mail-listener2");
const cheerio = require('cheerio');
const simpleParser = require('mailparser').simpleParser;
export class MailListener {

    public mailListener: any;

    constructor() {
        this.mailListener = new MailListenerClient({
            username: "vigirenganathan2006@gmail.com",
            password: "asjk'12as",
            host: "imap.gmail.com",
            port: 993,
            tls: true,
            mailbox: "INBOX",
            searchFilter: ["UNSEEN", ["FROM", "vigi.vijay.v@gmail.com"], ["SUBJECT", "Test"]],
            /*it will search for are "unseen" mail send from "fromemail@gmail.com" with subject "fromemail@gmail.com"*/
            connTimeout: 10000,
            authTimeout: 5000,
            markSeen: true,
            fetchUnreadOnStart: true,
            mailParserOptions: { streamAttachments: true }, // options to be passed to mailParser lib.
            attachments: true, // download attachments as they are encountered to the project directory
            attachmentOptions: { directory: "attachments/" },
            debug: console.log
        });
    }

    init() {
        this.mailListener.start();
        console.log("Start Done")
        this.mailListener.on("server:connected", function () {
            console.log("Mail listener initialized")
        })
    }



    close() {
        this.mailListener.stop();
        this.mailListener.on("server:disconnected", function () {
            console.log("imapDisconnected")
        })
    }


    async getLinkFromEmail() {
        var self = this;
        return new Promise((resolve, reject) => {
            self.mailListener.on("mail", function (mail) {
                /*simpleParser is used to convert string to HTML format*/
                simpleParser(mail.eml).then(function (parsedEmail) {
                    var html = parsedEmail.html;
                    /* cheerio is used to write query on parsed HTML content
                     * refer https://www.npmjs.com/package/cheerio 
                     */
                    resolve(cheerio.load(html)("a").attr("href"));
                });
            });

            self.mailListener.on("error", function (err) {
                reject(err);
            });
        });
    }

}
