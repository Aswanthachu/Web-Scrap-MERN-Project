import mongoose from "mongoose";

const scrapSchema=mongoose.Schema({
    webLink:{
        type:String,
        required:true
    },
    textCount:{
        type:Number,
        required:true
    },
    links:{
        type:Array,
    },
    images:{
        type:Array,
    },
    favourite:{
        type:Boolean,
        default:false
    },
    searchedAt:{
        type:Date,
        default:Date.now(),
        required:true
    }
});

const scrapedData = mongoose.model('scrapedData',scrapSchema);
export default scrapedData;