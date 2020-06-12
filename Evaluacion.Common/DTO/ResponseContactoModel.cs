using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Evaluacion.Common.DTO
{
    public class ResponseContactoModel
    {
        private List<ContactoModel> listContactos_;

        /// <summary>
        /// Constructor
        /// </summary>
        public ResponseContactoModel()
        {
            this.listContactos_ = new List<ContactoModel>();
        }

        public List<ContactoModel> ListContactos
        {
            get
            {
                return this.listContactos_;
            }
            set
            {
                this.listContactos_ = value;
            }
        }

        public int TotalGlobal { get; set; }
    }
}
