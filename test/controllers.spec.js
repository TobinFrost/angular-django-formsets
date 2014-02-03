describe('djangoFormsetController', function(){

  var controller, 
    attrs = {
      djangoFormset: '_formset_template.html',
      djangoFormsetPrefix: 'foo',
      djangoFormsetCanDelete: true,
      djangoFormsetCanOrder: true
    },
    formsetInput = function(name, value) {
      var input = angular.element('<input>');
      input.prop('name', attrs.djangoFormsetPrefix + '-' + name);
      input.val(value || '');
      return input;
    },
    TEMPLATE = '<div data-fid="__prefix__">Foo Bar</di>';

  beforeEach(inject(function($controller, $templateCache) {
    $templateCache.put(attrs.djangoFormset, TEMPLATE);
    controller = $controller('djangoFormsetController', {$attrs: attrs});
  }));

  it('should define a controller', function() {
    expect(controller).to.be.defined;
  });

  describe('#setup(element)', function() {
    var element = angular.element('<div></div>'), 
      totalFormInput = formsetInput('TOTAL_FORMS', '0');

    beforeEach(function() {
      element.append(totalFormInput);
    });

    it('should set the __formset__ container element', function() {
      controller.setup(element);
      expect(controller.__formset__).to.be.defined;
      expect(controller.__formset__).to.be.equal(element);
    });

    it('should set the __template__', function() {
      controller.setup(element);
      expect(controller.__template__).to.be.defined;
      expect(controller.__template__).to.be.equal(TEMPLATE);
    });

    it('should find the highest __fid__ from the formset`s children input',
      function(){
        var child = angular.element('<div></div>'),
          childFid = 8;
        // Add a input to child and add to children list
        child.append(formsetInput(childFid + '-foo'));
        controller.__children__.push(child);
        // Setup
        controller.setup(element);
        expect(controller.__fid__).to.be.equal(childFid);
      }
    );

    it('should find the __totalforms__ element', function() {
      var totalFormsValue = '10';
      totalFormInput.val(totalFormsValue);

      controller.setup(element);
      expect(controller.__totalforms__).to.be.defined;
      expect(controller.__totalforms__.val()).to.be.equal(totalFormsValue);
    });

    it('should find the __minforms__ element', function() {
      var minFormsValue = 1;
      element.append(formsetInput('INITIAL_FORMS', minFormsValue));

      controller.setup(element);
      expect(controller.__minforms__).to.be.equal(minFormsValue);
    });

    it('should find the __maxforms__ element', function() {
      var maxFormsValue = 50;
      element.append(formsetInput('MAX_NUM_FORMS', maxFormsValue));

      controller.setup(element);
      expect(controller.__maxforms__).to.be.equal(maxFormsValue);
    });

    it('should raise and error if __totalforms__ is not defined', function() {
      var badElement = angular.element('<div><!-- No input here --></div>');
      expect(
        function() {
          controller.setup(badElement);
        }
      ).to.throw(SyntaxError).and.to.throw(/TOTAL_FORMS/);
    });
  });

  describe('#update()', function() {
    it('should update __totalforms__ value with current children length');
  });

  describe('#addFormset()', function() {
    it('should increase __fid__');
    it('should replace any __prefix__ in the template with __fid__ value');
    it('should append/compile a new formset children to the container');
    it('should not add if __maxforms__ is reached');
  });

  describe('#removeFormset(element)', function() {
    it('should remove formset children from the container');
    it('should find the children container with prefix data-*');
    it('should find the children container with prefix x-*');
    it('should hide formeset children and set delete input if __candelete__');
  });

  describe('#registerChild(element)', function() {
    it('should add a children and update');
  });

  describe('#destroyChild', function() {
    it('should remove a children and update');
  });
});
