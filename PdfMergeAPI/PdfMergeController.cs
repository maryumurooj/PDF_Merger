using Microsoft.AspNetCore.Mvc;
using PdfSharpCore.Pdf;
using PdfSharpCore.Pdf.IO;

namespace PdfMergeAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PdfMergeController : ControllerBase
    {
        [HttpPost("merge")]
        public IActionResult MergePdfs([FromForm] List<IFormFile> files)
        {
            if (files.Count < 2)
                return BadRequest("Please upload at least two PDF files.");

            using var outputDocument = new PdfDocument();

            foreach (var file in files)
            {
                using var stream = file.OpenReadStream();
                var inputDocument = PdfReader.Open(stream, PdfDocumentOpenMode.Import);

                for (int i = 0; i < inputDocument.PageCount; i++)
                {
                    outputDocument.AddPage(inputDocument.Pages[i]);
                }
            }

            using var memoryStream = new MemoryStream();
            outputDocument.Save(memoryStream, false);
            memoryStream.Position = 0;

            return File(memoryStream.ToArray(), "application/pdf", "merged.pdf");
        }
    }
}
