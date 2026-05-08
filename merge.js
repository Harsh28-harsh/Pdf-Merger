const PDFMerger = require('pdf-merger-js').default

const mergePDF = async(p1 , p2)=>{
    const merger = new PDFMerger();
    await merger.add(p1)
    await merger.add(p2)
    
    
    await merger.save('public/merger.pdf')
}

module.exports = {mergePDF}