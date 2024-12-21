const express = require("express");
const { SkillUpdate, SkillsFetcher, FetchMatchedSkills, SkillsFetcherByID } = require('../Controllers/SkillUpdate');
const router = express.Router();
const fetchuser = require("../Middleware/fetchuser");

router.post('/skillsadd', fetchuser, SkillUpdate);
router.get('/fetchskills', fetchuser, SkillsFetcher);
router.post('/fetchmatchSkill', fetchuser, FetchMatchedSkills);
router.get('/fetchskillsbyID/:USERID', fetchuser, SkillsFetcherByID);

module.exports = router;
