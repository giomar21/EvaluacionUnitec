using Evaluacion.API.Servicios;
using Evaluacion.Common;
using Evaluacion.Common.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Evaluacion.API.Controllers
{
    public class ContactoController : ApiController
    {
        [HttpPost]
        [ActionName("")]
        public OperationResult Post([FromBody] ContactoModel contacto)
        {
            return ContactoService.Create(contacto);
        }

        [HttpGet]
        [ActionName("")]
        public ResponseContactoModel Get(int numRegistros, int numPagina, string filter)
        {
            return ContactoService.Get(numRegistros, numPagina, filter);
        }

        [HttpDelete]
        [ActionName("")]
        public OperationResult Delete(Guid id)
        {
            return ContactoService.Delete(id);
        }

        [HttpPut]
        [ActionName("")]
        public OperationResult Put([FromBody] ContactoModel contacto)
        {
            return ContactoService.Update(contacto);
        }
    }
}
