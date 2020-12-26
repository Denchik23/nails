(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/actions/ModalAddNails.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/actions/ModalAddNails.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "ModalAddNails"
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/actions/ModalAddNails.vue?vue&type=template&id=52050f48&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/actions/ModalAddNails.vue?vue&type=template&id=52050f48&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "b-modal",
        {
          attrs: { id: "modal-1", title: "Добавление нового клиента" },
          scopedSlots: _vm._u([
            {
              key: "modal-footer",
              fn: function(ref) {
                var ok = ref.ok
                var cancel = ref.cancel
                return [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-success",
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          return ok()
                        }
                      }
                    },
                    [_vm._v("Сохранить")]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-danger",
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          return cancel()
                        }
                      }
                    },
                    [_vm._v("Отмена")]
                  )
                ]
              }
            }
          ])
        },
        [
          _c("form", [
            _c("div", { staticClass: "form-group" }, [
              _c("label", { attrs: { for: "name" } }, [_vm._v("Имя клиента")]),
              _vm._v(" "),
              _c("input", {
                staticClass: "form-control",
                attrs: {
                  type: "text",
                  placeholder: "Введите Имя",
                  name: "name"
                }
              })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group" }, [
              _c("label", { attrs: { for: "phone" } }, [
                _vm._v("Телефон клиента")
              ]),
              _vm._v(" "),
              _c("input", {
                staticClass: "form-control",
                attrs: {
                  type: "text",
                  placeholder: "Введите телефон клиента",
                  name: "phone"
                }
              })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group" }, [
              _c("label", { attrs: { for: "description" } }, [
                _vm._v("Псевдоним")
              ]),
              _vm._v(" "),
              _c("input", {
                staticClass: "form-control",
                attrs: {
                  type: "text",
                  placeholder: "Введите Псевдоним клиента",
                  name: "description"
                }
              }),
              _vm._v(" "),
              _c(
                "small",
                {
                  staticClass: "form-text text-muted",
                  attrs: { id: "emailHelp" }
                },
                [_vm._v("We'll never share your email with anyone else.")]
              )
            ])
          ])
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/actions/ModalAddNails.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/actions/ModalAddNails.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ModalAddNails_vue_vue_type_template_id_52050f48_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalAddNails.vue?vue&type=template&id=52050f48&scoped=true& */ "./resources/js/components/actions/ModalAddNails.vue?vue&type=template&id=52050f48&scoped=true&");
/* harmony import */ var _ModalAddNails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalAddNails.vue?vue&type=script&lang=js& */ "./resources/js/components/actions/ModalAddNails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModalAddNails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModalAddNails_vue_vue_type_template_id_52050f48_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ModalAddNails_vue_vue_type_template_id_52050f48_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "52050f48",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/actions/ModalAddNails.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/actions/ModalAddNails.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/actions/ModalAddNails.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAddNails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalAddNails.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/actions/ModalAddNails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAddNails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/actions/ModalAddNails.vue?vue&type=template&id=52050f48&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/components/actions/ModalAddNails.vue?vue&type=template&id=52050f48&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAddNails_vue_vue_type_template_id_52050f48_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalAddNails.vue?vue&type=template&id=52050f48&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/actions/ModalAddNails.vue?vue&type=template&id=52050f48&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAddNails_vue_vue_type_template_id_52050f48_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAddNails_vue_vue_type_template_id_52050f48_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);