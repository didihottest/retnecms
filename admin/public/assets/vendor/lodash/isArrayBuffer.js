var baseIsArrayBuffer=require("./_baseIsArrayBuffer"),baseUnary=require("./_baseUnary"),nodeUtil=require("./_nodeUtil"),nodeIsArrayBuffer=nodeUtil&&nodeUtil.isArrayBuffer,isArrayBuffer=nodeIsArrayBuffer?baseUnary(nodeIsArrayBuffer):baseIsArrayBuffer;module.exports=isArrayBuffer;