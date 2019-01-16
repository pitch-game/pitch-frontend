using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

public class WhateverController : Controller {

    [Authorize()]
    [HttpGet("~/api/test")]
    public JsonResult Test(){
        return new JsonResult("test");
    }
}