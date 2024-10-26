import initModels from "./../models/init-models.js";
import sequelize from "./../models/connect.js";
import sinon from "sinon";
import {expect} from 'chai';

import { getListVideo } from "./../controllers/video.controller.js";

const model = initModels(sequelize);

// describe bộ test case cho controller getVideos
describe("get video list", () => {
    let req, res, findAllStub 

    beforeEach(() => {
        // giả lập req, res object 
        req = {};
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        }

        // giả lập thằng findall của model video 
        findAllStub = sinon.stub(model.video,'findAll');
    });

    // khôi phục lại những setting sau khi test các case
    afterEach(() => {
        sinon.restore();
    })

    it(' return 200 and list of video', async () => {
        const videos = [
            {
                "video_id": 1,
                "video_name": "Introduction to Coding",
                "thumbnail": "deadpool.jpg",
                "description": "Learn the basics of coding",
                "views": 1500,
                "source": "youtube.com",
                "user_id": 1,
                "type_id": 2
            } 
        ]

        findAllStub.resolves(videos);

        await getListVideo(req, res);

        // kiểm tra res.status được gọi với 200
        expect(res.status.calledWith(200)).to.be.true; 

    });
})
