const mongoose =require( 'mongoose')
const { Schema } = mongoose;

const MovieSchema = new Schema({
  
  name:  {
    type:String,
    required: true
  },
  img:{
    type:String,
    required: true
  },
  summary:{
    type:String,
    required: true
  }
});


module.exports = mongoose.model('Movies', MovieSchema);