import {
  TimesIcon
} from "./chunk-NNHHEU72.js";
import {
  BaseComponent,
  BaseStyle
} from "./chunk-TVTSJGPO.js";
import {
  C,
  K,
  O,
  PrimeTemplate,
  Qt,
  Rt,
  SharedModule,
  Tt,
  W,
  v
} from "./chunk-EA7IW645.js";
import {
  animate,
  style,
  transition,
  trigger
} from "./chunk-6GTSJF4Y.js";
import {
  CommonModule,
  NgClass,
  NgIf,
  NgTemplateOutlet
} from "./chunk-2QABQZXT.js";
import {
  isPlatformBrowser
} from "./chunk-CF2FR6KN.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  NgZone,
  Output,
  ViewEncapsulation,
  booleanAttribute,
  effect,
  inject,
  setClassMetadata,
  signal,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-STUXR2Y5.js";
import "./chunk-P6U2JBMQ.js";
import "./chunk-35ENWJA4.js";

// node_modules/@primeuix/styles/dist/ripple/index.mjs
var style2 = "\n    .p-ink {\n        display: block;\n        position: absolute;\n        background: dt('ripple.background');\n        border-radius: 100%;\n        transform: scale(0);\n        pointer-events: none;\n    }\n\n    .p-ink-active {\n        animation: ripple 0.4s linear;\n    }\n\n    @keyframes ripple {\n        100% {\n            opacity: 0;\n            transform: scale(2.5);\n        }\n    }\n";

// node_modules/primeng/fesm2022/primeng-ripple.mjs
var theme = (
  /*css*/
  `
    ${style2}
    /* For PrimeNG */
    .p-ripple {
        overflow: hidden;
        position: relative;
    }

    .p-ripple-disabled .p-ink {
        display: none !important;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`
);
var classes = {
  root: "p-ink"
};
var RippleStyle = class _RippleStyle extends BaseStyle {
  name = "ripple";
  theme = theme;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵRippleStyle_BaseFactory;
    return function RippleStyle_Factory(__ngFactoryType__) {
      return (ɵRippleStyle_BaseFactory || (ɵRippleStyle_BaseFactory = ɵɵgetInheritedFactory(_RippleStyle)))(__ngFactoryType__ || _RippleStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _RippleStyle,
    factory: _RippleStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RippleStyle, [{
    type: Injectable
  }], null, null);
})();
var RippleClasses;
(function(RippleClasses2) {
  RippleClasses2["root"] = "p-ink";
})(RippleClasses || (RippleClasses = {}));
var Ripple = class _Ripple extends BaseComponent {
  zone = inject(NgZone);
  _componentStyle = inject(RippleStyle);
  animationListener;
  mouseDownListener;
  timeout;
  constructor() {
    super();
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        if (this.config.ripple()) {
          this.zone.runOutsideAngular(() => {
            this.create();
            this.mouseDownListener = this.renderer.listen(this.el.nativeElement, "mousedown", this.onMouseDown.bind(this));
          });
        } else {
          this.remove();
        }
      }
    });
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
  onMouseDown(event) {
    let ink = this.getInk();
    if (!ink || this.document.defaultView?.getComputedStyle(ink, null).display === "none") {
      return;
    }
    O(ink, "p-ink-active");
    if (!Tt(ink) && !Rt(ink)) {
      let d = Math.max(v(this.el.nativeElement), C(this.el.nativeElement));
      ink.style.height = d + "px";
      ink.style.width = d + "px";
    }
    let offset = K(this.el.nativeElement);
    let x = event.pageX - offset.left + this.document.body.scrollTop - Rt(ink) / 2;
    let y = event.pageY - offset.top + this.document.body.scrollLeft - Tt(ink) / 2;
    this.renderer.setStyle(ink, "top", y + "px");
    this.renderer.setStyle(ink, "left", x + "px");
    W(ink, "p-ink-active");
    this.timeout = setTimeout(() => {
      let ink2 = this.getInk();
      if (ink2) {
        O(ink2, "p-ink-active");
      }
    }, 401);
  }
  getInk() {
    const children = this.el.nativeElement.children;
    for (let i = 0; i < children.length; i++) {
      if (typeof children[i].className === "string" && children[i].className.indexOf("p-ink") !== -1) {
        return children[i];
      }
    }
    return null;
  }
  resetInk() {
    let ink = this.getInk();
    if (ink) {
      O(ink, "p-ink-active");
    }
  }
  onAnimationEnd(event) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    O(event.currentTarget, "p-ink-active");
  }
  create() {
    let ink = this.renderer.createElement("span");
    this.renderer.addClass(ink, "p-ink");
    this.renderer.appendChild(this.el.nativeElement, ink);
    this.renderer.setAttribute(ink, "aria-hidden", "true");
    this.renderer.setAttribute(ink, "role", "presentation");
    if (!this.animationListener) {
      this.animationListener = this.renderer.listen(ink, "animationend", this.onAnimationEnd.bind(this));
    }
  }
  remove() {
    let ink = this.getInk();
    if (ink) {
      this.mouseDownListener && this.mouseDownListener();
      this.animationListener && this.animationListener();
      this.mouseDownListener = null;
      this.animationListener = null;
      Qt(ink);
    }
  }
  ngOnDestroy() {
    if (this.config && this.config.ripple()) {
      this.remove();
    }
    super.ngOnDestroy();
  }
  static ɵfac = function Ripple_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Ripple)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _Ripple,
    selectors: [["", "pRipple", ""]],
    hostAttrs: [1, "p-ripple"],
    features: [ɵɵProvidersFeature([RippleStyle]), ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Ripple, [{
    type: Directive,
    args: [{
      selector: "[pRipple]",
      host: {
        class: "p-ripple"
      },
      standalone: true,
      providers: [RippleStyle]
    }]
  }], () => [], null);
})();
var RippleModule = class _RippleModule {
  static ɵfac = function RippleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RippleModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _RippleModule,
    imports: [Ripple],
    exports: [Ripple]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RippleModule, [{
    type: NgModule,
    args: [{
      imports: [Ripple],
      exports: [Ripple]
    }]
  }], null, null);
})();

// node_modules/@primeuix/styles/dist/message/index.mjs
var style3 = "\n    .p-message {\n        border-radius: dt('message.border.radius');\n        outline-width: dt('message.border.width');\n        outline-style: solid;\n    }\n\n    .p-message-content {\n        display: flex;\n        align-items: center;\n        padding: dt('message.content.padding');\n        gap: dt('message.content.gap');\n        height: 100%;\n    }\n\n    .p-message-icon {\n        flex-shrink: 0;\n    }\n\n    .p-message-close-button {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n        margin-inline-start: auto;\n        overflow: hidden;\n        position: relative;\n        width: dt('message.close.button.width');\n        height: dt('message.close.button.height');\n        border-radius: dt('message.close.button.border.radius');\n        background: transparent;\n        transition:\n            background dt('message.transition.duration'),\n            color dt('message.transition.duration'),\n            outline-color dt('message.transition.duration'),\n            box-shadow dt('message.transition.duration'),\n            opacity 0.3s;\n        outline-color: transparent;\n        color: inherit;\n        padding: 0;\n        border: none;\n        cursor: pointer;\n        user-select: none;\n    }\n\n    .p-message-close-icon {\n        font-size: dt('message.close.icon.size');\n        width: dt('message.close.icon.size');\n        height: dt('message.close.icon.size');\n    }\n\n    .p-message-close-button:focus-visible {\n        outline-width: dt('message.close.button.focus.ring.width');\n        outline-style: dt('message.close.button.focus.ring.style');\n        outline-offset: dt('message.close.button.focus.ring.offset');\n    }\n\n    .p-message-info {\n        background: dt('message.info.background');\n        outline-color: dt('message.info.border.color');\n        color: dt('message.info.color');\n        box-shadow: dt('message.info.shadow');\n    }\n\n    .p-message-info .p-message-close-button:focus-visible {\n        outline-color: dt('message.info.close.button.focus.ring.color');\n        box-shadow: dt('message.info.close.button.focus.ring.shadow');\n    }\n\n    .p-message-info .p-message-close-button:hover {\n        background: dt('message.info.close.button.hover.background');\n    }\n\n    .p-message-info.p-message-outlined {\n        color: dt('message.info.outlined.color');\n        outline-color: dt('message.info.outlined.border.color');\n    }\n\n    .p-message-info.p-message-simple {\n        color: dt('message.info.simple.color');\n    }\n\n    .p-message-success {\n        background: dt('message.success.background');\n        outline-color: dt('message.success.border.color');\n        color: dt('message.success.color');\n        box-shadow: dt('message.success.shadow');\n    }\n\n    .p-message-success .p-message-close-button:focus-visible {\n        outline-color: dt('message.success.close.button.focus.ring.color');\n        box-shadow: dt('message.success.close.button.focus.ring.shadow');\n    }\n\n    .p-message-success .p-message-close-button:hover {\n        background: dt('message.success.close.button.hover.background');\n    }\n\n    .p-message-success.p-message-outlined {\n        color: dt('message.success.outlined.color');\n        outline-color: dt('message.success.outlined.border.color');\n    }\n\n    .p-message-success.p-message-simple {\n        color: dt('message.success.simple.color');\n    }\n\n    .p-message-warn {\n        background: dt('message.warn.background');\n        outline-color: dt('message.warn.border.color');\n        color: dt('message.warn.color');\n        box-shadow: dt('message.warn.shadow');\n    }\n\n    .p-message-warn .p-message-close-button:focus-visible {\n        outline-color: dt('message.warn.close.button.focus.ring.color');\n        box-shadow: dt('message.warn.close.button.focus.ring.shadow');\n    }\n\n    .p-message-warn .p-message-close-button:hover {\n        background: dt('message.warn.close.button.hover.background');\n    }\n\n    .p-message-warn.p-message-outlined {\n        color: dt('message.warn.outlined.color');\n        outline-color: dt('message.warn.outlined.border.color');\n    }\n\n    .p-message-warn.p-message-simple {\n        color: dt('message.warn.simple.color');\n    }\n\n    .p-message-error {\n        background: dt('message.error.background');\n        outline-color: dt('message.error.border.color');\n        color: dt('message.error.color');\n        box-shadow: dt('message.error.shadow');\n    }\n\n    .p-message-error .p-message-close-button:focus-visible {\n        outline-color: dt('message.error.close.button.focus.ring.color');\n        box-shadow: dt('message.error.close.button.focus.ring.shadow');\n    }\n\n    .p-message-error .p-message-close-button:hover {\n        background: dt('message.error.close.button.hover.background');\n    }\n\n    .p-message-error.p-message-outlined {\n        color: dt('message.error.outlined.color');\n        outline-color: dt('message.error.outlined.border.color');\n    }\n\n    .p-message-error.p-message-simple {\n        color: dt('message.error.simple.color');\n    }\n\n    .p-message-secondary {\n        background: dt('message.secondary.background');\n        outline-color: dt('message.secondary.border.color');\n        color: dt('message.secondary.color');\n        box-shadow: dt('message.secondary.shadow');\n    }\n\n    .p-message-secondary .p-message-close-button:focus-visible {\n        outline-color: dt('message.secondary.close.button.focus.ring.color');\n        box-shadow: dt('message.secondary.close.button.focus.ring.shadow');\n    }\n\n    .p-message-secondary .p-message-close-button:hover {\n        background: dt('message.secondary.close.button.hover.background');\n    }\n\n    .p-message-secondary.p-message-outlined {\n        color: dt('message.secondary.outlined.color');\n        outline-color: dt('message.secondary.outlined.border.color');\n    }\n\n    .p-message-secondary.p-message-simple {\n        color: dt('message.secondary.simple.color');\n    }\n\n    .p-message-contrast {\n        background: dt('message.contrast.background');\n        outline-color: dt('message.contrast.border.color');\n        color: dt('message.contrast.color');\n        box-shadow: dt('message.contrast.shadow');\n    }\n\n    .p-message-contrast .p-message-close-button:focus-visible {\n        outline-color: dt('message.contrast.close.button.focus.ring.color');\n        box-shadow: dt('message.contrast.close.button.focus.ring.shadow');\n    }\n\n    .p-message-contrast .p-message-close-button:hover {\n        background: dt('message.contrast.close.button.hover.background');\n    }\n\n    .p-message-contrast.p-message-outlined {\n        color: dt('message.contrast.outlined.color');\n        outline-color: dt('message.contrast.outlined.border.color');\n    }\n\n    .p-message-contrast.p-message-simple {\n        color: dt('message.contrast.simple.color');\n    }\n\n    .p-message-text {\n        font-size: dt('message.text.font.size');\n        font-weight: dt('message.text.font.weight');\n    }\n\n    .p-message-icon {\n        font-size: dt('message.icon.size');\n        width: dt('message.icon.size');\n        height: dt('message.icon.size');\n    }\n\n    .p-message-enter-from {\n        opacity: 0;\n    }\n\n    .p-message-enter-active {\n        transition: opacity 0.3s;\n    }\n\n    .p-message.p-message-leave-from {\n        max-height: 1000px;\n    }\n\n    .p-message.p-message-leave-to {\n        max-height: 0;\n        opacity: 0;\n        margin: 0;\n    }\n\n    .p-message-leave-active {\n        overflow: hidden;\n        transition:\n            max-height 0.45s cubic-bezier(0, 1, 0, 1),\n            opacity 0.3s,\n            margin 0.3s;\n    }\n\n    .p-message-leave-active .p-message-close-button {\n        opacity: 0;\n    }\n\n    .p-message-sm .p-message-content {\n        padding: dt('message.content.sm.padding');\n    }\n\n    .p-message-sm .p-message-text {\n        font-size: dt('message.text.sm.font.size');\n    }\n\n    .p-message-sm .p-message-icon {\n        font-size: dt('message.icon.sm.size');\n        width: dt('message.icon.sm.size');\n        height: dt('message.icon.sm.size');\n    }\n\n    .p-message-sm .p-message-close-icon {\n        font-size: dt('message.close.icon.sm.size');\n        width: dt('message.close.icon.sm.size');\n        height: dt('message.close.icon.sm.size');\n    }\n\n    .p-message-lg .p-message-content {\n        padding: dt('message.content.lg.padding');\n    }\n\n    .p-message-lg .p-message-text {\n        font-size: dt('message.text.lg.font.size');\n    }\n\n    .p-message-lg .p-message-icon {\n        font-size: dt('message.icon.lg.size');\n        width: dt('message.icon.lg.size');\n        height: dt('message.icon.lg.size');\n    }\n\n    .p-message-lg .p-message-close-icon {\n        font-size: dt('message.close.icon.lg.size');\n        width: dt('message.close.icon.lg.size');\n        height: dt('message.close.icon.lg.size');\n    }\n\n    .p-message-outlined {\n        background: transparent;\n        outline-width: dt('message.outlined.border.width');\n    }\n\n    .p-message-simple {\n        background: transparent;\n        outline-color: transparent;\n        box-shadow: none;\n    }\n\n    .p-message-simple .p-message-content {\n        padding: dt('message.simple.content.padding');\n    }\n\n    .p-message-outlined .p-message-close-button:hover,\n    .p-message-simple .p-message-close-button:hover {\n        background: transparent;\n    }\n";

// node_modules/primeng/fesm2022/primeng-message.mjs
var _c0 = ["container"];
var _c1 = ["icon"];
var _c2 = ["closeicon"];
var _c3 = ["*"];
var _c4 = (a0, a1) => ({
  showTransitionParams: a0,
  hideTransitionParams: a1
});
var _c5 = (a0) => ({
  value: "visible()",
  params: a0
});
var _c6 = (a0) => ({
  closeCallback: a0
});
function Message_Conditional_0_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Message_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Message_Conditional_0_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 7);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.iconTemplate || ctx_r0.iconTemplate);
  }
}
function Message_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "i");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r0.cn(ctx_r0.cx("icon"), ctx_r0.icon));
  }
}
function Message_Conditional_0_div_4_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 9);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵproperty("ngClass", ctx_r0.cx("text"))("innerHTML", ctx_r0.text, ɵɵsanitizeHtml);
  }
}
function Message_Conditional_0_div_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵtemplate(1, Message_Conditional_0_div_4_span_1_Template, 1, 2, "span", 8);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.escape);
  }
}
function Message_Conditional_0_ng_template_5_span_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 5);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵproperty("ngClass", ctx_r0.cx("text"));
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.text);
  }
}
function Message_Conditional_0_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Message_Conditional_0_ng_template_5_span_0_Template, 2, 2, "span", 10);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("ngIf", ctx_r0.escape && ctx_r0.text);
  }
}
function Message_Conditional_0_Conditional_7_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Message_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Message_Conditional_0_Conditional_7_ng_container_0_Template, 1, 0, "ng-container", 11);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.containerTemplate || ctx_r0.containerTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c6, ctx_r0.close.bind(ctx_r0)));
  }
}
function Message_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 5);
    ɵɵprojection(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ctx_r0.cx("text"));
  }
}
function Message_Conditional_0_Conditional_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "i", 5);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r0.cn(ctx_r0.cx("closeIcon"), ctx_r0.closeIcon));
    ɵɵproperty("ngClass", ctx_r0.closeIcon);
  }
}
function Message_Conditional_0_Conditional_9_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Message_Conditional_0_Conditional_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Message_Conditional_0_Conditional_9_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 7);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.closeIconTemplate || ctx_r0._closeIconTemplate);
  }
}
function Message_Conditional_0_Conditional_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 15);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r0.cx("closeIcon"));
  }
}
function Message_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 12);
    ɵɵlistener("click", function Message_Conditional_0_Conditional_9_Template_button_click_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.close($event));
    });
    ɵɵtemplate(1, Message_Conditional_0_Conditional_9_Conditional_1_Template, 1, 3, "i", 13)(2, Message_Conditional_0_Conditional_9_Conditional_2_Template, 1, 1, "ng-container")(3, Message_Conditional_0_Conditional_9_Conditional_3_Template, 1, 2, ":svg:svg", 14);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r0.cx("closeButton"));
    ɵɵattribute("aria-label", ctx_r0.closeAriaLabel);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.closeIcon ? 1 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.closeIconTemplate || ctx_r0._closeIconTemplate ? 2 : -1);
    ɵɵadvance();
    ɵɵconditional(!ctx_r0.closeIconTemplate && !ctx_r0._closeIconTemplate && !ctx_r0.closeIcon ? 3 : -1);
  }
}
function Message_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2)(1, "div");
    ɵɵtemplate(2, Message_Conditional_0_Conditional_2_Template, 1, 1, "ng-container")(3, Message_Conditional_0_Conditional_3_Template, 1, 2, "i", 3)(4, Message_Conditional_0_div_4_Template, 2, 1, "div", 4)(5, Message_Conditional_0_ng_template_5_Template, 1, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(7, Message_Conditional_0_Conditional_7_Template, 1, 4, "ng-container")(8, Message_Conditional_0_Conditional_8_Template, 2, 1, "span", 5)(9, Message_Conditional_0_Conditional_9_Template, 4, 6, "button", 6);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const escapeOut_r3 = ɵɵreference(6);
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.cn(ctx_r0.cx("root"), ctx_r0.styleClass));
    ɵɵproperty("@messageAnimation", ɵɵpureFunction1(16, _c5, ɵɵpureFunction2(13, _c4, ctx_r0.showTransitionOptions, ctx_r0.hideTransitionOptions)));
    ɵɵattribute("aria-live", "polite")("role", "alert");
    ɵɵadvance();
    ɵɵclassMap(ctx_r0.cx("content"));
    ɵɵadvance();
    ɵɵconditional(ctx_r0.iconTemplate || ctx_r0._iconTemplate ? 2 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.icon ? 3 : -1);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.escape)("ngIfElse", escapeOut_r3);
    ɵɵadvance(3);
    ɵɵconditional(ctx_r0.containerTemplate || ctx_r0._containerTemplate ? 7 : 8);
    ɵɵadvance(2);
    ɵɵconditional(ctx_r0.closable ? 9 : -1);
  }
}
var classes2 = {
  root: ({
    instance
  }) => ["p-message p-component p-message-" + instance.severity, "p-message-" + instance.variant, {
    "p-message-sm": instance.size === "small",
    "p-message-lg": instance.size === "large"
  }],
  content: "p-message-content",
  icon: "p-message-icon",
  text: "p-message-text",
  closeButton: "p-message-close-button",
  closeIcon: "p-message-close-icon"
};
var MessageStyle = class _MessageStyle extends BaseStyle {
  name = "message";
  theme = style3;
  classes = classes2;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMessageStyle_BaseFactory;
    return function MessageStyle_Factory(__ngFactoryType__) {
      return (ɵMessageStyle_BaseFactory || (ɵMessageStyle_BaseFactory = ɵɵgetInheritedFactory(_MessageStyle)))(__ngFactoryType__ || _MessageStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _MessageStyle,
    factory: _MessageStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MessageStyle, [{
    type: Injectable
  }], null, null);
})();
var MessageClasses;
(function(MessageClasses2) {
  MessageClasses2["root"] = "p-message";
  MessageClasses2["content"] = "p-message-content";
  MessageClasses2["icon"] = "p-message-icon";
  MessageClasses2["text"] = "p-message-text";
  MessageClasses2["closeButton"] = "p-message-close-button";
  MessageClasses2["closeIcon"] = "p-message-close-icon";
})(MessageClasses || (MessageClasses = {}));
var Message = class _Message extends BaseComponent {
  /**
   * Severity level of the message.
   * @defaultValue 'info'
   * @group Props
   */
  severity = "info";
  /**
   * Text content.
   * @deprecated since v20.0.0. Use content projection instead '<p-message>Content</p-message>'.
   * @group Props
   */
  text;
  /**
   * Whether displaying messages would be escaped or not.
   * @deprecated since v20.0.0. Use content projection instead '<p-message>Content</p-message>'.
   * @group Props
   */
  escape = true;
  /**
   * Inline style of the component.
   * @group Props
   */
  style;
  /**
   * Style class of the component.
   * @group Props
   */
  styleClass;
  /**
   * Whether the message can be closed manually using the close icon.
   * @group Props
   * @defaultValue false
   */
  closable = false;
  /**
   * Icon to display in the message.
   * @group Props
   * @defaultValue undefined
   */
  icon;
  /**
   * Icon to display in the message close button.
   * @group Props
   * @defaultValue undefined
   */
  closeIcon;
  /**
   * Delay in milliseconds to close the message automatically.
   * @defaultValue undefined
   */
  life;
  /**
   * Transition options of the show animation.
   * @defaultValue '300ms ease-out'
   * @group Props
   */
  showTransitionOptions = "300ms ease-out";
  /**
   * Transition options of the hide animation.
   * @defaultValue '200ms cubic-bezier(0.86, 0, 0.07, 1)'
   * @group Props
   */
  hideTransitionOptions = "200ms cubic-bezier(0.86, 0, 0.07, 1)";
  /**
   * Defines the size of the component.
   * @group Props
   */
  size;
  /**
   * Specifies the input variant of the component.
   * @group Props
   */
  variant;
  /**
   * Emits when the message is closed.
   * @param {{ originalEvent: Event }} event - The event object containing the original event.
   * @group Emits
   */
  onClose = new EventEmitter();
  get closeAriaLabel() {
    return this.config.translation.aria ? this.config.translation.aria.close : void 0;
  }
  visible = signal(true, ...ngDevMode ? [{
    debugName: "visible"
  }] : []);
  _componentStyle = inject(MessageStyle);
  /**
   * Custom template of the message container.
   * @group Templates
   */
  containerTemplate;
  /**
   * Custom template of the message icon.
   * @group Templates
   */
  iconTemplate;
  /**
   * Custom template of the close icon.
   * @group Templates
   */
  closeIconTemplate;
  templates;
  _containerTemplate;
  _iconTemplate;
  _closeIconTemplate;
  ngOnInit() {
    super.ngOnInit();
    if (this.life) {
      setTimeout(() => {
        this.visible.set(false);
      }, this.life);
    }
  }
  ngAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "container":
          this._containerTemplate = item.template;
          break;
        case "icon":
          this._iconTemplate = item.template;
          break;
        case "closeicon":
          this._closeIconTemplate = item.template;
          break;
      }
    });
  }
  /**
   * Closes the message.
   * @param {Event} event - Browser event.
   * @group Method
   */
  close(event) {
    this.visible.set(false);
    this.onClose.emit({
      originalEvent: event
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMessage_BaseFactory;
    return function Message_Factory(__ngFactoryType__) {
      return (ɵMessage_BaseFactory || (ɵMessage_BaseFactory = ɵɵgetInheritedFactory(_Message)))(__ngFactoryType__ || _Message);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _Message,
    selectors: [["p-message"]],
    contentQueries: function Message_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c0, 4);
        ɵɵcontentQuery(dirIndex, _c1, 4);
        ɵɵcontentQuery(dirIndex, _c2, 4);
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.containerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.iconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.closeIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    inputs: {
      severity: "severity",
      text: "text",
      escape: [2, "escape", "escape", booleanAttribute],
      style: "style",
      styleClass: "styleClass",
      closable: [2, "closable", "closable", booleanAttribute],
      icon: "icon",
      closeIcon: "closeIcon",
      life: "life",
      showTransitionOptions: "showTransitionOptions",
      hideTransitionOptions: "hideTransitionOptions",
      size: "size",
      variant: "variant"
    },
    outputs: {
      onClose: "onClose"
    },
    features: [ɵɵProvidersFeature([MessageStyle]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c3,
    decls: 1,
    vars: 1,
    consts: [["escapeOut", ""], [1, "p-message", "p-component", 3, "class"], [1, "p-message", "p-component"], [3, "class"], [4, "ngIf", "ngIfElse"], [3, "ngClass"], ["pRipple", "", "type", "button", 3, "class"], [4, "ngTemplateOutlet"], [3, "ngClass", "innerHTML", 4, "ngIf"], [3, "ngClass", "innerHTML"], [3, "ngClass", 4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["pRipple", "", "type", "button", 3, "click"], [3, "class", "ngClass"], ["data-p-icon", "times", 3, "class"], ["data-p-icon", "times"]],
    template: function Message_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵtemplate(0, Message_Conditional_0_Template, 10, 18, "div", 1);
      }
      if (rf & 2) {
        ɵɵconditional(ctx.visible() ? 0 : -1);
      }
    },
    dependencies: [CommonModule, NgClass, NgIf, NgTemplateOutlet, TimesIcon, Ripple, SharedModule],
    encapsulation: 2,
    data: {
      animation: [trigger("messageAnimation", [transition(":enter", [style({
        opacity: 0,
        transform: "translateY(-25%)"
      }), animate("{{showTransitionParams}}")]), transition(":leave", [animate("{{hideTransitionParams}}", style({
        height: 0,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        opacity: 0
      }))])])]
    },
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Message, [{
    type: Component,
    args: [{
      selector: "p-message",
      standalone: true,
      imports: [CommonModule, TimesIcon, Ripple, SharedModule],
      template: `
        @if (visible()) {
            <div
                class="p-message p-component"
                [attr.aria-live]="'polite'"
                [class]="cn(cx('root'), styleClass)"
                [attr.role]="'alert'"
                [@messageAnimation]="{
                    value: 'visible()',
                    params: {
                        showTransitionParams: showTransitionOptions,
                        hideTransitionParams: hideTransitionOptions
                    }
                }"
            >
                <div [class]="cx('content')">
                    @if (iconTemplate || _iconTemplate) {
                        <ng-container *ngTemplateOutlet="iconTemplate || iconTemplate"></ng-container>
                    }
                    @if (icon) {
                        <i [class]="cn(cx('icon'), icon)"></i>
                    }

                    <div *ngIf="!escape; else escapeOut">
                        <span *ngIf="!escape" [ngClass]="cx('text')" [innerHTML]="text"></span>
                    </div>

                    <ng-template #escapeOut>
                        <span *ngIf="escape && text" [ngClass]="cx('text')">{{ text }}</span>
                    </ng-template>

                    @if (containerTemplate || _containerTemplate) {
                        <ng-container *ngTemplateOutlet="containerTemplate || containerTemplate; context: { closeCallback: close.bind(this) }"></ng-container>
                    } @else {
                        <span [ngClass]="cx('text')">
                            <ng-content></ng-content>
                        </span>
                    }
                    @if (closable) {
                        <button pRipple type="button" [class]="cx('closeButton')" (click)="close($event)" [attr.aria-label]="closeAriaLabel">
                            @if (closeIcon) {
                                <i [class]="cn(cx('closeIcon'), closeIcon)" [ngClass]="closeIcon"></i>
                            }
                            @if (closeIconTemplate || _closeIconTemplate) {
                                <ng-container *ngTemplateOutlet="closeIconTemplate || _closeIconTemplate"></ng-container>
                            }
                            @if (!closeIconTemplate && !_closeIconTemplate && !closeIcon) {
                                <svg data-p-icon="times" [class]="cx('closeIcon')" />
                            }
                        </button>
                    }
                </div>
            </div>
        }
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [MessageStyle],
      animations: [trigger("messageAnimation", [transition(":enter", [style({
        opacity: 0,
        transform: "translateY(-25%)"
      }), animate("{{showTransitionParams}}")]), transition(":leave", [animate("{{hideTransitionParams}}", style({
        height: 0,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        opacity: 0
      }))])])]
    }]
  }], null, {
    severity: [{
      type: Input
    }],
    text: [{
      type: Input
    }],
    escape: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    closable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    icon: [{
      type: Input
    }],
    closeIcon: [{
      type: Input
    }],
    life: [{
      type: Input
    }],
    showTransitionOptions: [{
      type: Input
    }],
    hideTransitionOptions: [{
      type: Input
    }],
    size: [{
      type: Input
    }],
    variant: [{
      type: Input
    }],
    onClose: [{
      type: Output
    }],
    containerTemplate: [{
      type: ContentChild,
      args: ["container", {
        descendants: false
      }]
    }],
    iconTemplate: [{
      type: ContentChild,
      args: ["icon", {
        descendants: false
      }]
    }],
    closeIconTemplate: [{
      type: ContentChild,
      args: ["closeicon", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var MessageModule = class _MessageModule {
  static ɵfac = function MessageModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MessageModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MessageModule,
    imports: [Message, SharedModule],
    exports: [Message, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Message, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MessageModule, [{
    type: NgModule,
    args: [{
      imports: [Message, SharedModule],
      exports: [Message, SharedModule]
    }]
  }], null, null);
})();
export {
  Message,
  MessageClasses,
  MessageModule,
  MessageStyle
};
//# sourceMappingURL=primeng_message.js.map
