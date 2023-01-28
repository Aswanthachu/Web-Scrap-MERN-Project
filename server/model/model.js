import mongoose from "mongoose";

const scrapSchema=mongoose.Schema({
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
    videos:{
        type:Array,
    },
    favourite:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const scrapedData = mongoose.model('scrapedData',scrapSchema);
export default scrapedData;