L.Draw.Tooltip = L.Draw.Tooltip.extend({
  initialize: function (map) {
    this._map = map;
    this._popupPane = map._panes.popupPane;

    this._visible = false;
    this._isTooltipEmpty = true;
    this._hasPosition = false;

    this._container = map.options.drawControlTooltips
      ? L.DomUtil.create("div", "leaflet-draw-tooltip", this._popupPane)
      : null;
    this._singleLineLabel = false;

    this._map.on("mouseout", this._onMouseOut, this);
    this._map.once("mousemove", this._onFirstMouseMove, this);
    // this._map.on("click", this._onMapClick, this);
  },

  updateContent: function (labelText) {
    this._isTooltipEmpty = !labelText.text && !labelText.subtext;
    this._container.innerHTML = labelText.subtext
      ? '<span class="leaflet-draw-tooltip-subtext">' +
        labelText.subtext +
        "</span><br />" +
        "<span>" +
        labelText.text +
        "</span>"
      : "<span>" + labelText.text + "</span>";

    if (!labelText.text && !labelText.subtext) {
      this._isTooltipEmpty = false;
      this._visible = false;
      this._container.style.visibility = "hidden";
    } else {
      //   this._visible = true;
      //   this._container.style.visibility = "inherit";
      //   this._isTooltipEmpty = false;
      //   if (this._hasPosition) {
      //     this._visible = true;
      //     this._container.style.visibility = "inherit";
      //   }
    }

    return this;
  },

  _onFirstMouseMove: function () {
    this._hasPosition = true;
    if (!this._isTooltipEmpty) {
      this._visible = true;
    }
  },

  _onMapClick: function (e) {
    this._visible = true;
    this._container.style.visibility = "inherit";
    if (this._container && this._map) {
      const point = this._map.latLngToLayerPoint(latlng);
      L.DomUtil.setPosition(this._container, point.add([10, 10]));
    }
  },
});
